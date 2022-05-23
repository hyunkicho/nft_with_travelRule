//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../ERC721TravelRuleExtension.sol";
import "../TravelRuleManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TravelRuleNft is Ownable ,ERC721TravelRuleExtension {
     using Strings for uint256;
     string private _baseUri;
    constructor(
        string memory name,
        string memory symbol,
        string memory baseUri,
        address _travelRuleManager
    )
    ERC721TravelRuleExtension(_travelRuleManager)
    ERC721(name, symbol)
    {
        _baseUri = baseUri;
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }
    function mint(address user, uint256 tokenId) public onlyOwner {
        _mint(user, tokenId);
        _setTokenURI(tokenId, tokenURI(tokenId));
    }

    function burn(uint256 tokenId) public onlyOwner {
        _setTokenURI(tokenId, "");
        _burn(tokenId);
    }

}

