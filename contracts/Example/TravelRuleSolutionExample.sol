//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TravelRuleSolutionExample is Ownable { //Extension 자체로 활용 여부.
    mapping (uint256 => string) private vaspCode;
    mapping (address => UserInfo) public UserInformation;

    uint public vaspIndex;

    enum UserType { NATURAL, LEGAL }

    struct UserInfo {
        bytes32 userCode;
        bytes32 userType;
        bytes32 name;
        bytes32 nameID;
        bytes32 user_address;
        bytes32 datesAndPlacOfBirth;
        bytes32 NationalIdentification;
    }

    function updateInfo (
        address userAddress,
        bytes32 _userCode,
        bytes32 _userType,
        bytes32 _name,
        bytes32 _nameID,
        bytes32 _user_address,
        bytes32 _datesAndPlacOfBirth,
        bytes32 _nationalIdentification
    )
    public onlyOwner {

        UserInfo memory userInfo;
        userInfo.userCode = _userCode;
        userInfo.userType = _userType;
        userInfo.name = _name;
        userInfo.nameID = _nameID;
        userInfo.user_address = _user_address;
        userInfo.datesAndPlacOfBirth = _datesAndPlacOfBirth;
        userInfo.NationalIdentification = _nationalIdentification;

        UserInformation[userAddress] = userInfo;
    }

    function setVaspCode (string memory _vaspCode) public onlyOwner {
        vaspCode[vaspIndex] = _vaspCode;
        vaspIndex++;
    }

    function getVaspCode (uint256 _vaspIndex) public view returns(string memory) {
        return vaspCode[_vaspIndex];
    }
}

