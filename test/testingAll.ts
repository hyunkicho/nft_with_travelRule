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


    describe("Travel rule service could set Travel Rule Service Data if they want", async () => {

      //user data
      let userCode = await abiCoder.encode(["string"],["123A"]);
      let userType = await abiCoder.encode(["string"],["NATURAL"]);
      let name = await abiCoder.encode(["string"],["cho hyun ki"]);
      let nameID = await abiCoder.encode(["string"],["LEGL"]);
      let user_address = await abiCoder.encode(["string"],["950130"]);
      let NationalIdentification = await abiCoder.encode(["string"],["1341324-13423532"])
      let datesAndPlacOfBirth = await abiCoder.encode(["string"],["950130"])
      let customerEncodedData = await abiCoder.encode(
        ["string","string","string","string","string","string","string"],
        [userCode,userType,name,nameID,user_address,datesAndPlacOfBirth,NationalIdentification]
      )
      let encodeDatakeccack = await ethers.utils.keccak256(customerEncodedData);

      it("register setTravelRuleServiceData to TravelRuleManager",async () => {
      await travelRuleManager.connect(from_vasp).setTravelRuleServiceData(travelRuleNft.address,1,encodeDatakeccack);
      await travelRuleManager.connect(to_vasp).setTravelRuleServiceData(travelRuleNft.address,1,encodeDatakeccack);
      })

      it("transfer NFT have to be done with event logs and pass the requirement state", async () => {
        console.log(await travelRuleManager.isRegistered(from_vasp.address))
        expect(await travelRuleNft.connect(from_vasp).transferFrom(from_vasp.address,to_vasp.address,1))
        .to.emit(travelRuleNft,"travelRuleLog")
        .withArgs(encodeDatakeccack,encodeDatakeccack)
        ;
      })
    })
  })
})