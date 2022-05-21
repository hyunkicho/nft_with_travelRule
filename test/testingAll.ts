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
  let from_customer: SignerWithAddress;
  let to_customer: SignerWithAddress;
  [owner, from_vasp, to_vasp, from_customer, to_customer] = await ethers.getSigners();

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

      it("TravelRuleManager Must be registerd", async () => {
        expect(await travelRuleManager.isRegistered(from_vasp.address)).to.be.true;
      })

      it("register to_vasp to TravelRuleManager",async () => {
        await travelRuleManager.register(to_vasp.address);
      })

      it("TravelRuleManager Must be registerd", async () => {
        expect(await travelRuleManager.isRegistered(to_vasp.address)).to.be.true;
      })
    })

    describe("Travel Rule manage can register ", async () => {
      it("register from_customer to TravelRuleManager",async () => {
        await travelRuleManager.connect(from_vasp).setCustomer(from_customer.address);
      })

      it("TravelRuleManager Must be registerd", async () => {
        expect(await travelRuleManager.isRegisteredCustomer(from_customer.address)).to.be.true;
      })

      it("register to_customer to TravelRuleManager",async () => {
        await travelRuleManager.connect(to_vasp).setCustomer(to_customer.address);
      })

      it("TravelRuleManager Must be registerd", async () => {
        expect(await travelRuleManager.isRegisteredCustomer(to_customer.address)).to.be.true;
      })
    })

    //mint example NFT to from_customer with token Id 1

    describe("mint example NFT to from_customer", async () => {
      it("mint NFT example", async () => {
        await travelRuleNft.mint(from_customer.address,1)
      })

      it("owner must be correct", async () => {
        expect(await travelRuleNft.ownerOf(1)).to.equal(from_customer.address)
      })
    })

    describe("[update from_customer info]If travelRule service have on chian system it should contain updateInfromation", async () => {

      it("register setTravelRuleServiceData to TravelRuleManager",async () => {
        //user data
        let userCode = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("A234324"));
        let userType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NATURAL"));
        let name = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("cho hyun ki"));
        let nameID = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
        let user_address = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Seoul"));
        let NationalIdentification = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("A23423-123213"));
        let datesAndPlacOfBirth = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("950130"));
        await travelRuleSolutionExample_1.updateInfo(
          from_customer.address,
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
         const result = await travelRuleSolutionExample_1.UserInformation(from_customer.address)
         console.log("get from_customer data >>>>>>>>>>>>>", result)
      })
    })

    describe("[update to_vasp info]If travelRule service have on chian system it should contain updateInfromation", async () => {

      it("setTravelRuleServiceData of from_customer to TravelRuleManager",async () => {
        //user data
        let userCode = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AB34324"));
        let userType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NATURAL"));
        let name = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("cho hyun ki"));
        let nameID = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
        let user_address = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Gorgia"));
        let NationalIdentification = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("234234-23432"));
        let datesAndPlacOfBirth = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("938202"));
        await travelRuleSolutionExample_1.updateInfo(
          from_customer.address,
          userCode,
          userType,
          name,
          nameID,
          user_address,
          datesAndPlacOfBirth,
          NationalIdentification
        )
      })

      it("setTravelRuleServiceData of to_customer TravelRuleManager_2",async () => {
        //user data
        let userCode = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AB34324"));
        let userType = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NATURAL"));
        let name = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("kim yeon hee"));
        let nameID = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
        let user_address = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Gorgia"));
        let NationalIdentification = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("234234-23432"));
        let datesAndPlacOfBirth = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("938202"));
        await travelRuleSolutionExample_2.updateInfo(
          to_customer.address,
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
         const result = await travelRuleSolutionExample_2.UserInformation(to_customer.address)
         console.log("get to_vasp data >>>>>>>>>>>>>", result)
      })
    })

    describe("Travel rule service could set Travel Rule Service Data if they want", async () => {

      it("setTravelRuleServiceData to TravelRuleManager with vasp code",async () => {
        const from_customer_info = await travelRuleSolutionExample_1.UserInformation(from_customer.address);
        //user data
        let userCode = await from_customer_info.userCode;
        let userType = await  from_customer_info.userType;
        let name = await  from_customer_info.name;
        let nameID = await  from_customer_info.nameID;
        let user_address = await  from_customer_info.user_address;
        let NationalIdentification = await  from_customer_info.NationalIdentification;
        let datesAndPlacOfBirth = await  from_customer_info.datesAndPlacOfBirth;
        let customerEncodedData = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode,userType,name,nameID,user_address,datesAndPlacOfBirth,NationalIdentification]
        )
        let encodeDatakeccack_from = await ethers.utils.keccak256(customerEncodedData);

        const to_customer_info = await travelRuleSolutionExample_2.UserInformation(to_customer.address);
        //user data
        let userCode_to = await to_customer_info.userCode;
        let userType_to = await  to_customer_info.userType;
        let name_to = await  to_customer_info.name;
        let nameID_to = await  to_customer_info.nameID;
        let user_address_to = await  to_customer_info.user_address;
        let NationalIdentification_to = await  to_customer_info.NationalIdentification;
        let datesAndPlacOfBirth_to = await  to_customer_info.datesAndPlacOfBirth;
        let customerEncodedData_to = await abiCoder.encode(
          ["string","string","string","string","string","string","string"],
          [userCode_to,userType_to,name_to,nameID_to,user_address_to,datesAndPlacOfBirth_to,NationalIdentification_to]
        )
        let encodeDatakeccack_to = await ethers.utils.keccak256(customerEncodedData_to);

        await travelRuleManager.connect(from_vasp).setTravelRuleServiceData(travelRuleNft.address,1,from_customer.address,encodeDatakeccack_from,"SDFSES123");
        await travelRuleManager.connect(to_vasp).setTravelRuleServiceData(travelRuleNft.address,1,to_customer.address,encodeDatakeccack_to,"RQGQR12313");
      })

      it("check if travel rule log is recorded", async () => {
        expect(await travelRuleNft.connect(from_customer).transferFrom(from_customer.address,to_customer.address,1))
        .to.emit(travelRuleNft,"travelRuleLog")
        .withArgs(
          await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,1,from_customer.address),
          await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,1,to_customer.address)
        );
      })

      it("travle rule log can be decoded back, check with from data", async () => {
        let encodedData_from = await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,1,from_customer.address);
        console.log(await travelRuleManager.decodeDataAndVaspCode(encodedData_from));
      })

      it("travle rule log can be decoded back, check with to data", async () => {
        let encodedData_to = await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,1,to_customer.address);
        console.log(await travelRuleManager.decodeDataAndVaspCode(encodedData_to));
      })
    })
  })
})