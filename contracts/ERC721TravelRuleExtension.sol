// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Pausable.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./TravelRuleManager.sol";

/**
 * @dev ERC721 token with travel Rule.
 *
 */
abstract contract ERC721TravelRuleExtension is ERC721URIStorage {
    /**
     * @dev See {ERC721-_beforeTokenTransfer}.
     *
     * Requirements:
     *
     * - the contract must be held by registered travel rule service.
     */

    address private travelRuleManager;

    event travelRuleLog (bytes32 travleRuleData_from, bytes32 travleRuleData_to);

    constructor(address _travelRuleManager) 
    {
        setTravelRuleManager(_travelRuleManager);
    }

    function setTravelRuleManager(address _travelRuleManagerAddress) internal {
       travelRuleManager = _travelRuleManagerAddress;
    }
     
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        require(!TravelRuleManager(travelRuleManager).isRegistred(from), "ERC721TravelRule: token transfer from non registerd");
        require(!TravelRuleManager(travelRuleManager).isRegistred(to), "ERC721TravelRule: token transfer to non registerd");
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._afterTokenTransfer(from, to, tokenId);

        emit travelRuleLog(TravelRuleManager(travelRuleManager).getTravelRuleServiceData(address(this),tokenId,from),TravelRuleManager(travelRuleManager).getTravelRuleServiceData(address(this),tokenId,to));
    }
}
