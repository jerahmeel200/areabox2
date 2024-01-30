import { ethers } from 'hardhat';

async function main() {
  const aristos = await ethers.deployContract('Aristos');

  await aristos.waitForDeployment();

  console.log(` deployed to ${aristos.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
