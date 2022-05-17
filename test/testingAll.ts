import { expect } from "chai";
import { run, ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const abiCoder = ethers.utils.defaultAbiCoder;

chai.use(solidity);

let exampleERC721URI: string = "https://opensea-creatures-api.herokuapp.com/api/creature/ ";
let name: string = "ExampleNFT";
let symbol: string = "ENFT";

describe("Starting test with constants", async () => {
  it("start all the test", async () => {
  // contracts
  let travelRuleNft: Contract;
  let travelRuleSolutionExample_1: Contract;
  let travelRuleSolutionExample_2: Contract;
  let travelRuleManager: Contract;
  //signers
  let owner: SignerWithAddress;
  let from_vasp: SignerWithAddress;
  let to_vasp: SignerWithAddress;
  [owner, from_vasp, to_vasp] = await ethers.getSigners();

  //deploy TravelRuleManager and nft Example

    describe("deploy TravelRuleManager", async () => {
      it("Should Deploy TravelRuleManager correctly", async () => {
        const TravelRuleManagerFactory = await ethers.getContractFactory("TravelRuleManager");
        travelRuleManager = await TravelRuleManagerFactory.deploy();
        await travelRuleManager.deployed();
      });
    })

    describe("deploy nftExample", async () => {
      it("Should Deploy TravelRuleNft correctly", async () => {
        const TravelRuleNftFactory = await ethers.getContractFactory("TravelRuleNft");
        travelRuleNft = await TravelRuleNftFactory.deploy(name,symbol,exampleERC721URI,travelRuleManager.address);
        await travelRuleNft.deployed();
      });
    })

    describe("deploy travleRuleSolutionExample", async () => {
      it("Should Deploy travelRuleSolutionExample_1 correctly", async () => {
        const TravelRuleNftSolution = await ethers.getContractFactory("TravelRuleSolutionExample");
        travelRuleSolutionExample_1 = await TravelRuleNftSolution.deploy();
        await travelRuleSolutionExample_1.deployed();
      });
    })

    describe("deploy travleRuleSolutionExample_2", async () => {
      it("Should Deploy travelRuleSolutionExample_2 correctly", async () => {
        const TravelRuleNftSolution = await ethers.getContractFactory("TravelRuleSolutionExample");
        travelRuleSolutionExample_2 = await TravelRuleNftSolution.deploy();
        await travelRuleSolutionExample_2.deployed();
      });
    })


    describe("Travel rule service must register their address to Travel Rule manager", async () => {
      it("register from_vasp to TravelRuleManager",async () => {
        await travelRuleManager.register(from_vasp.address);
      })

      it("TravelRuleManager Mutst be registerd", async () => {
        expect(await travelRuleManager.isRegistered(from_vasp.address)).to.be.true;
      })

      it("register to_vasp to TravelRuleManager",async () => {
        await travelRuleManager.register(to_vasp.address);
      })

      it("TravelRuleManager Mutst be registerd", async () => {
        expect(await travelRuleManager.isRegistered(to_vasp.address)).to.be.true;
      })
    })

    //mint example NFT to from_vasp with token Id 1

    describe("mint example NFT to from_vasp", async () => {
      it("mint NFT example", async () => {
        await travelRuleNft.mint(from_vasp.address,1)
      })

      it("owner must be correct", async () => {
        expect(await travelRuleNft.ownerOf(1)).to.equal(from_vasp.address)
      })
    })

    describe("[update from_vasp info]If travelRule service have on chian system it should contain updateInfromation", async () => {

      it("register setTravelRuleServiceData to TravelRuleManager",async () => {
        //user data
        let userCode = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("A234324"));
        let userType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGAL"));
        let name = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("A234324"));
        let nameID = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
        let user_address = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Atlanta"));
        let NationalIdentification = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("A23423"));
        let datesAndPlacOfBirth = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("970130"));
        await travelRuleSolutionExample_1.updateInfo(
          from_vasp.address,
          userCode,
          userType,
          name,
          nameID,
          user_address,
          datesAndPlacOfBirth,
          NationalIdentification
        )
      })

      it("check travle rule service data", async () => {
         const result = await travelRuleSolutionExample_1.UserInformation(from_vasp.address)
         console.log("get from_vasp data >>>>>>>>>>>>>", result)
      })
    })

    describe("[update to_vasp info]If travelRule service have on chian system it should contain updateInfromation", async () => {

      it("register setTravelRuleServiceData to TravelRuleManager",async () => {
        //user data
        let userCode = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AB34324"));
        let userType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NATURAL"));
        let name = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("kim yeon hee"));
        let nameID = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
        let user_address = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Gorgia"));
        let NationalIdentification = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("234234-23432"));
        let datesAndPlacOfBirth = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("938202"));
        await travelRuleSolutionExample_2.updateInfo(
          to_vasp.address,
          userCode,
          userType,
          name,
          nameID,
          user_address,
          datesAndPlacOfBirth,
          NationalIdentification
        )
      })

      it("check travle rule service data", async () => {
         const result = await travelRuleSolutionExample_2.UserInformation(to_vasp.address)
         console.log("get from_vasp data >>>>>>>>>>>>>", result)

      })
    })


    describe("Travel rule service could set Travel Rule Service Data if they want", async () => {

      it("set data of fromVasp and toVasp", async () => {
        
      })


      it("register setTravelRuleServiceData to TravelRuleManager",async () => {
        const from_vasp_info = await travelRuleSolutionExample_1.UserInformation(from_vasp.address);
        //user data
        let userCode = await from_vasp_info.userCode;
        let userType = await  from_vasp_info.userType;
        let name = await  from_vasp_info.name;
        let nameID = await  from_vasp_info.nameID;
        let user_address = await  from_vasp_info.user_address;
        let NationalIdentification = await  from_vasp_info.NationalIdentification;
        let datesAndPlacOfBirth = await  from_vasp_info.datesAndPlacOfBirth;
        let customerEncodedData = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode,userType,name,nameID,user_address,datesAndPlacOfBirth,NationalIdentification]
        )
        let encodeDatakeccack_from = await ethers.utils.keccak256(customerEncodedData);

        const to_vasp_info = await travelRuleSolutionExample_2.UserInformation(from_vasp.address);
        //user data
        let userCode_to = await to_vasp_info.userCode;
        let userType_to = await  to_vasp_info.userType;
        let name_to = await  to_vasp_info.name;
        let nameID_to = await  to_vasp_info.nameID;
        let user_address_to = await  to_vasp_info.user_address;
        let NationalIdentification_to = await  to_vasp_info.NationalIdentification;
        let datesAndPlacOfBirth_to = await  to_vasp_info.datesAndPlacOfBirth;
        let customerEncodedData_to = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode_to,userType_to,name_to,nameID_to,user_address_to,datesAndPlacOfBirth_to,NationalIdentification_to]
        )
        let encodeDatakeccack_to = await ethers.utils.keccak256(customerEncodedData_to);
      await travelRuleManager.connect(from_vasp).setTravelRuleServiceData(travelRuleNft.address,1,encodeDatakeccack_from);
      await travelRuleManager.connect(to_vasp).setTravelRuleServiceData(travelRuleNft.address,1,encodeDatakeccack_to);
      })

      it("transfer NFT have to be done with event logs and pass the requirement state", async () => {
        const from_vasp_info = await travelRuleSolutionExample_1.UserInformation(from_vasp.address);
        //user data
        let userCode = await from_vasp_info.userCode;
        let userType = await  from_vasp_info.userType;
        let name = await  from_vasp_info.name;
        let nameID = await  from_vasp_info.nameID;
        let user_address = await  from_vasp_info.user_address;
        let NationalIdentification = await  from_vasp_info.NationalIdentification;
        let datesAndPlacOfBirth = await  from_vasp_info.datesAndPlacOfBirth;
        let customerEncodedData = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode,userType,name,nameID,user_address,datesAndPlacOfBirth,NationalIdentification]
        )
        let encodeDatakeccack_from = await ethers.utils.keccak256(customerEncodedData);

        const to_vasp_info = await travelRuleSolutionExample_2.UserInformation(from_vasp.address);
        //user data
        let userCode_to = await to_vasp_info.userCode;
        let userType_to = await  to_vasp_info.userType;
        let name_to = await  to_vasp_info.name;
        let nameID_to = await  to_vasp_info.nameID;
        let user_address_to = await  to_vasp_info.user_address;
        let NationalIdentification_to = await  to_vasp_info.NationalIdentification;
        let datesAndPlacOfBirth_to = await  to_vasp_info.datesAndPlacOfBirth;
        let customerEncodedData_to = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode_to,userType_to,name_to,nameID_to,user_address_to,datesAndPlacOfBirth_to,NationalIdentification_to]
        )
        let encodeDatakeccack_to = await ethers.utils.keccak256(customerEncodedData_to);
        console.log(await travelRuleManager.isRegistered(from_vasp.address))
        expect(await travelRuleNft.connect(from_vasp).transferFrom(from_vasp.address,to_vasp.address,1))
        .to.emit(travelRuleNft,"travelRuleLog")
        .withArgs(encodeDatakeccack_from,encodeDatakeccack_to)
        ;
      })
    })
  })
})