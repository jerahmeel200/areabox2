import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Aristos', function () {
  async function deployAristosFixture() {
    const TOKENURI = 'https://someuri.user/$avatarinformation';
    const [deployer, user, otherAccount] = await ethers.getSigners();
    const Aristos = await ethers.getContractFactory('Aristos');
    const aristos = await Aristos.deploy();

    return { aristos, deployer, user, otherAccount, TOKENURI };
  }

  describe('Deployment', function () {
    it('Should set Avatar name correctly', async function () {
      const { aristos } = await loadFixture(deployAristosFixture);

      expect(await aristos.name()).to.equal('Aristo');
    });

    it('Should set Avatar symbol correctly', async function () {
      const { aristos } = await loadFixture(deployAristosFixture);

      expect(await aristos.symbol()).to.equal('AR$T');
    });

    it('Should set the right owner for the Aristo Avatar', async function () {
      const { aristos, deployer } = await loadFixture(deployAristosFixture);

      expect(await aristos.owner()).to.equal(deployer.address);
    });

    it('Should create user profile successfully', async function () {
      const { aristos, user, TOKENURI } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      const profile = aristos.getProfile(user);

      expect(profile.exist).to.be.true;
      expect(profile.avatarId.toNumber()).to.be.equal(1);
    });

    it("User's default reputation should be correct", async function () {
      const { aristos, user, TOKENURI } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      const profile = aristos.getProfile(user);

      expect(profile.reputation.toNumber()).to.be.equal(51);
      expect(profile.rating).to.be.equal(0);
    });

    it('Should upgrade user successfully', async function () {
      const { aristos, deployer, user, TOKENURI } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      await aristos.connect(deployer).upgradeReputation([user]);
      const profile = aristos.getProfile(user);

      await expect(profile.reputation.toNumber()).to.be.equal(52);
    });

    it('Should downgrade user successfully', async function () {
      const { aristos, deployer, user, TOKENURI } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      await aristos.connect(deployer).downgradeReputation([user]);
      const profile = aristos.getProfile(user);

      await expect(profile.reputation.toNumber()).to.be.equal(50);
    });

    it('Should rate user successfully', async function () {
      const { aristos, deployer, user, TOKENURI, otherAccount } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      await aristos.connect(otherAccount).createAristos(TOKENURI);

      await aristos.connect(otherAccount).rate(user, 2);
      const rating = aristos.getRating(user);

      await expect(rating).to.be.equal(2);
    });

    it('Should deactivate user is reputations fall below acceptable threshold', async function () {
      const { aristos, deployer, user, TOKENURI, otherAccount } =
        await loadFixture(deployAristosFixture);
      await aristos.connect(user).createAristos(TOKENURI);
      const threshold = 51;
      for (let i = 0; i < threshold; ++i) {
        await aristos.connect(deployer).downgradeReputation([user]);
      }

      await expect(
        aristos.connect(user).createAristos()
      ).to.be.revertedWithCustomError(aristos, 'UserWasBarred()');
      expect(await aristos.prevented(user)).to.be.true;
      expect(await aristos.getRating(user)).to.be.equal(0);
    });
  });
});
