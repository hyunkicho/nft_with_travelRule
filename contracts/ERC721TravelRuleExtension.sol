// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Pausable.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./TravelRuleManager.sol";
import "hardhat/console.sol";


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

    event travelRuleLog (bytes travleRuleData_from ,bytes travleRuleData_to);

    constructor(address _travelRuleManager) 
    {
        setTravelRuleManager(_travelRuleManager);
    }

    function setTravelRuleManager(address _travelRuleManagerAddress) internal {
       travelRuleManager = _travelRuleManagerAddress;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._afterTokenTransfer(from, to, tokenId);
        if(from != address(0x0)) {
            if(to != address(0x0)) {
                if(TravelRuleManager(travelRuleManager).isRegisteredCustomer(from)) {
                    if(TravelRuleManager(travelRuleManager).isRegisteredCustomer(to)) {
                        emit travelRuleLog(
                            TravelRuleManager(travelRuleManager).getTravelRuleServiceData(address(this),tokenId,from),
                            TravelRuleManager(travelRuleManager).getTravelRuleServiceData(address(this),tokenId,to)
                        );
                    }
                }
            }
        }
    }
}
