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
  it("start erc721 test", async () => {
  // contracts
  let erc721: Contract;
  let travelRuleNFT: Contract;
  let travelRuleManager: Contract;

  //signers
  let owner: SignerWithAddress;
  let from: SignerWithAddress;
  let to: SignerWithAddress;
  let example: SignerWithAddress

  [owner, from, to, example] = await ethers.getSigners();

  //deploy TravelRuleManager and nft Example

    describe("deploy ERC721", async () => {
      it("Should Deploy ERC721 correctly", async () => {
        const Erc721Factory = await ethers.getContractFactory("ERC721Example");
        erc721 = await Erc721Factory.deploy(name,symbol,exampleERC721URI);
        await erc721.deployed();
      });
    })

    describe("mint example NFT to from_customer", async () => {
      it("mint NFT example", async () => {
        await erc721.mint(from.address,1)
      })

      it("owner must be correct", async () => {
        expect(await erc721.ownerOf(1)).to.equal(from.address)
      })

      it("transferFrom NFT example", async () => {
        await erc721.connect(from).transferFrom(from.address,to.address,1)
      })

      it("owner must be correct", async () => {
        expect(await erc721.ownerOf(1)).to.equal(to.address)
      })
    })

    describe("burn example NFT to from_customer", async () => {
      it("burn NFT example", async () => {
        await erc721.connect(to).burn(1)
      })
    })

    describe("deploy TravelRuleManager", async () => {
      it("Should Deploy TravelRuleManager correctly", async () => {
        const TravelRuleManagerFactory = await ethers.getContractFactory("TravelRuleManager");
        travelRuleManager = await TravelRuleManagerFactory.deploy();
        await travelRuleManager.deployed();
      });
    })

    describe("deploy travelRuleNFT", async () => {
      it("Should Deploy TravelRuleNft correctly", async () => {
        const travelRuleNFTFactory = await ethers.getContractFactory("TravelRuleNft");
        travelRuleNFT = await travelRuleNFTFactory.deploy(name,symbol,exampleERC721URI,travelRuleManager.address);
        await travelRuleNFT.deployed();
      });
    })


    describe("mint travelRuleNFT to from_customer", async () => {
      it("mint travelRuleNFT example", async () => {
        await travelRuleNFT.mint(from.address,1)
      })

      it("owner must be correct", async () => {
        expect(await travelRuleNFT.ownerOf(1)).to.equal(from.address)
      })

      it("transferFrom NFT example", async () => {
        await travelRuleNFT.connect(from).transferFrom(from.address,to.address,1)
      })

      it("owner must be correct", async () => {
        expect(await travelRuleNFT.ownerOf(1)).to.equal(to.address)
      })
    })

    describe("burn travelRuleNFT to from_customer", async () => {
      it("burn travelRuleNFT example", async () => {
        await travelRuleNFT.connect(to).burn(1)
      })
    })
  })
})
