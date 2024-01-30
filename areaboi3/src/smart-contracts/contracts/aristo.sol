// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 < 0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Aristos is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    uint256 _tokenURIs;

    struct RenderToken{
        uint256 id;
        string uri;
    }

    constructor() ERC721("Aristo", "AR$T"){}

    function _setTokenURI(uint tokenId, string memory URI) internal {
        _tokenURIs[tokenId] = URI;
    }

    function tokenURI(uint tokenId) public view override returns (string memory) {
        require(_exists(tokenId));
        string memory URI = _tokenURIs[tokenId];
        return URI;
    }

    function createAristos(string memory _tokenURI) public  returns (uint) {
        uint256 newId = _tokenIdTracker.current();
        _mint(msg.sender, newId);
        _setTokenURI(newId, _tokenURI);
        _tokenIdTracker.increment();

        return newId;
    }

    function returntokenURI() public view returns(uint) {
        return _tokenURIs;
    }
}