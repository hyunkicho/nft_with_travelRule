//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TravelRuleManager is Ownable{ //Extension 자체로 활용 여부.
    mapping (address => mapping(uint256 => mapping(address => bytes32))) private travelRuleServiceData; 
    //1st address  is contract address
    //2nd uint256 is tokenId
    //3rd address is travelruleSolutionAddress
    //value is the value usued by TravelRuleSolution

    mapping (address => bool) private travelRuleRegistry; //address is TravelRuleSoultion Example


    modifier onlyRegisterd() {
        require(isRegistered(msg.sender) == true, "Mapping: caller must be a registered bridge contract address");
        _;
    }

    function setTravelRuleServiceData (address _contractAddress,uint256 _tokenID, bytes32 _travelRuleServiceData) public onlyRegisterd {
        travelRuleServiceData[_contractAddress][_tokenID][msg.sender]=_travelRuleServiceData;
    }

    function register (address _address) public onlyOwner {
        travelRuleRegistry[_address]=true;
    }

    function getTravelRuleServiceData (address _contractAddress, uint256 _tokenID, address _travelRuleSolutionAddress) public view returns(bytes32) {
        return travelRuleServiceData[_contractAddress][_tokenID][_travelRuleSolutionAddress];
    }

    function isRegistered (address _address) public view returns(bool) {
        return travelRuleRegistry[_address];
    }
}

