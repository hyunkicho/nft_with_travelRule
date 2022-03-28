//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TravelRuleNft is ERC721URIStorage {
     using Strings for uint256;

    string private _tokenUri;

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseUri
    ) ERC721(name, symbol) {
        _tokenUri = _baseUri;
    }
 
    function mint(address user, uint256 tokenId) public {
        _setTokenURI(tokenId, _tokenUri);
        _mint(user, tokenId);
    }
    
    function burn(uint256 tokenId) public  {
        _setTokenURI(tokenId, "");
        _burn(tokenId);
    }

}

