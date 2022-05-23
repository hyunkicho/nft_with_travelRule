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

  //signers
  let owner: SignerWithAddress;
  let from: SignerWithAddress;
  let to: SignerWithAddress;

  [owner, from, to] = await ethers.getSigners();

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
  })
})
