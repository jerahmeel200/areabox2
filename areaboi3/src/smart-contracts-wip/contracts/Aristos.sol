// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Aristos is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    error RateCannotExceedFive();
    error UserWasBarred();

    /**@dev Token Ids */
    uint256 _tokenURIs;

    /**@dev Custom errors */
    error UserExist();

    // struct RenderToken{
    //     uint256 id;
    //     string uri;
    // }

    /**@notice User profile data */
    struct Profile {
        bool exist;
        uint avatarId;
        uint reputation;
        uint8 rating;
    }

    /**@dev Profiles: User address returns a profile object */
    mapping(address => Profile) private profiles;

    mapping(address => bool) public prevented;

    modifier notPrevented(address user) {
        if(prevented[user]) revert UserWasBarred();
        _;
    }

    constructor() ERC721("Aristo", "AR$T"){}

    function _setTokenURI(uint tokenId, string memory URI) private {
        _tokenURIs[tokenId] = URI;
    }

    function tokenURI(uint tokenId) public view override returns (string memory) {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }

    /**@notice User creates a profile.
        An A$T is minted.
        @param _tokenURI : Token metalink
        Note: By default, every user has a reputation reading from 51.
        Users'reputation can be upgraded or downgraded.
     */
    function createAristos(string memory _tokenURI) public notPrevented(_msgSender()) returns (uint) {
        address caller = _msgSender();
        if(profiles[caller].exist) revert UserExist();
        _tokenIdTracker.increment();
        uint256 newId = _tokenIdTracker.current();
        profiles[caller] = Profile(true, newId, 51, 0);
        _mint(caller, newId);
        _setTokenURI(newId, _tokenURI);

        return newId;
    }

    /**@dev Downgrade accounts reputation
        OnlyOwner function.
        @param accounts : An array of addresses to downgrade.
     */
    function downgradeReputation(address[] memory accounts) public onlyOwner {
        _adjusteRep(accounts, false);
    }

    /**@dev Adjusts reputation of accounts
     */
    /**@dev Dynamic function to upgrade accounts reputation
        OnlyOwner function.
        @param accounts : An array of addresses to downgrade.
     */
    function upgradeReputation(address[] memory accounts) public onlyOwner {
        _adjusteRep(accounts, true);
    }

    function _adjusteRep(address[] memory accounts, bool increment) private {
        for(uint i = 0; i < accounts.length; i++) {
            address target = accounts[i];
            Profile memory _p = profiles[target];
            if(_p.exist){
                if(_p.reputation >= 1) {
                    if(increment){
                        profiles[target].reputation = _p.reputation + 1;
                    } else {
                        profiles[target].reputation = _p.reputation - 1;
                        if(profiles[target].reputation == 0) {
                            prevented[target] = true;
                            _burn(profiles[target].avatarId);
                            delete profiles[target];
                        }
                    }
                }
            }
        }
    }

    /**@notice Rate user
        @param user : Target user
        @param rating : Rating value, should be 5 or lesser.
     */
    function rate(address user, uint8 rating) public notPrevented(_msgSender()) {
        Profile memory _p = profiles[_msgSender()];
        require(_p.exist, "Only AreaBox user");
        if(rating > 5) revert RateCannotExceedFive();
        uint8 reps;
        if(rating == 5) reps = 3;
        if(rating == 4) reps = 2;
        if(rating == 3) reps = 1;
        if(rating < 3) {
            if(_p.rating >= rating) {
                unchecked {
                    profiles[caller].rating = _p.rating - rating;
                }
            } else {
                profiles[caller].rating = rating;
            }
        } else {
            profiles[caller].reputation += reps;
        }
    }

    function getRating(address user) public view returns(uint8) {
        return profiles[user].rating;
    }

    /**@dev Users are resticted from transfering or trading profile avatar
    Note: Only an account with ownership access can do this.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override onlyOwner {
        _transfer( from, to, tokenId);
    }

    function returntokenURI() public view returns(uint) {
        return _tokenURIs;
    }

    function getProfile(address user) public view returns(Profile memory) {
        return profiles[user];
    }
}