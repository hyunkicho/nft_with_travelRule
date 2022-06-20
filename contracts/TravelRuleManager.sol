//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TravelRuleManager is Ownable{ //Extension 자체로 활용 여부.
    mapping (address => mapping(uint256 => mapping(address => mapping(uint256 => bytes)))) private travelRuleServiceData; 
    //1st address  is contract address
    //2nd uint256 is tokenId
    //3rd address is travelruleSolutionAddress
    //value is the value usued by TravelRuleSolution

    mapping (address => bool) private travelRuleRegistry; //address is TravelRuleSoultion Example
    mapping (address => bool) private registerdCustomer;
    mapping (address => uint256) public customerNonce;

    uint256 private txIndex;

    modifier onlyRegisterd() {
        require(isRegistered(msg.sender) == true, "TravelRuleManager: caller must be a registered contract address");
        _;
    }

    function setTravelRuleServiceData (
        address _contractAddress,
        uint256 _tokenID,
        address _customerAddress,
        bytes32 _travelRuleServiceData,
        string memory _vaspCode
        ) public onlyRegisterd {
        registerdCustomer[msg.sender] = true;
        customerNonce[_customerAddress]= customerNonce[_customerAddress]+1;
        uint256 _customerNonce = customerNonce[_customerAddress];
        bytes memory encodedData = abi.encode(_travelRuleServiceData,_vaspCode);
        travelRuleServiceData[_contractAddress][_tokenID][_customerAddress][_customerNonce] = encodedData;
    }

    function decodeDataAndVaspCode (bytes memory _encodedData) public view returns(bytes32 _travelRuleServiceData,string memory _vaspCode) {
        (_travelRuleServiceData,_vaspCode) = abi.decode(_encodedData,(bytes32, string));
    }

    function setCustomer (address _address) public onlyRegisterd {
        registerdCustomer[_address] = true;
    }

    function register (address _address) public onlyOwner {
        travelRuleRegistry[_address] = true;
    }

    function getTravelRuleServiceData (
        address _contractAddress,
        uint256 _tokenID,
        address _customerAddress
        ) public view returns(bytes memory) {
        uint256 _customerNonce = customerNonce[_customerAddress];
        return travelRuleServiceData[_contractAddress][_tokenID][_customerAddress][_customerNonce];
    }

    function isRegistered (address _address) public view returns(bool) {
        return travelRuleRegistry[_address];
    }

    function isRegisteredCustomer (address _address) public view returns(bool) {
        return registerdCustomer[_address];
    }
}
