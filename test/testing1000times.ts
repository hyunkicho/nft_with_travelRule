import { expect } from "chai";
import { run, ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const abiCoder = ethers.utils.defaultAbiCoder;
import { userMockData } from "../mock_user_data";

chai.use(solidity);

let exampleERC721URI: string = "https://opensea-creatures-api.herokuapp.com/api/creature/ ";
let name: string = "ExampleNFT";
let symbol: string = "ENFT";

let mockUserData = userMockData;
describe("Starting test with constants", async () => {
    it("start all the test", async () => {
        // contracts
        let travelRuleNft: Contract;
        let travelRuleSolutionExample: Contract;
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
            it("Should Deploy travelRuleSolutionExample correctly", async () => {
                const TravelRuleNftSolution = await ethers.getContractFactory("TravelRuleSolutionExample");
                travelRuleSolutionExample = await TravelRuleNftSolution.deploy();
                await travelRuleSolutionExample.deployed();
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
        
        describe("Test 1000 times to prove solution is working", async () => {

            it("register user mock data to TravelRuelManager 0-100",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,0);
            })

            it("register user mock data to TravelRuelManager 101-200",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,110);
            })

            it("register user mock data to TravelRuelManager 201-300",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,220);
            })

            it("register user mock data to TravelRuelManager 301-400",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,330);
            })

            it("register user mock data to TravelRuelManager 401-500",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,440);
            })

            it("register user mock data to TravelRuelManager 501-600",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,550);
            })

            it("register user mock data to TravelRuelManager 601-700",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,660);
            })

            it("register user mock data to TravelRuelManager 701-800",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,770);
            })

            it("register user mock data to TravelRuelManager 801-900",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,880);
            })

            it("register user mock data to TravelRuelManager 901-1000",async () => {
                await testScript(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,990);
            })
        })
    })
})


async function mockTx(
    travelRuleNft: Contract,
    travelRuleSolutionExample: Contract,
    travelRuleManager: Contract,
    from_vasp: SignerWithAddress,
    to_vasp: SignerWithAddress,    
    i:number
    ) {
    let signers = await ethers.getSigners()
                    
    //mint TravelRuleNFT for sender
    await travelRuleNft.mint(signers[0].address,i)
    
    //update user Info
    let userCode_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mockUserData[i].userCode));
    let userType_raw = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("NATURAL"));
    let name_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mockUserData[i].name));
    let nameID_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LEGL"));
    let user_address_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mockUserData[i].user_address));
    let NationalIdentification_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mockUserData[i].NationalIdentification));
    let datesAndPlacOfBirth_raw = await ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mockUserData[i].dateAndPlaceOfBirth));
    await travelRuleSolutionExample.updateInfo(
        signers[0].address,
        userCode_raw,
        userType_raw,
        name_raw,
        nameID_raw,
        user_address_raw,
        NationalIdentification_raw,
        datesAndPlacOfBirth_raw
    )
    
    //register Customer
    await travelRuleManager.connect(from_vasp).setCustomer(signers[0].address);
    await travelRuleManager.connect(to_vasp).setCustomer(signers[1].address);
    
    //저장된 IVMS101 데이터 불러오기 
    const from_customer_info = await travelRuleSolutionExample.UserInformation(signers[0].address);
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

    await travelRuleSolutionExample.setVaspCode("VASPCODE-EXAMPLE-A");

    const to_customer_info = await travelRuleSolutionExample.UserInformation(signers[1].address);
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
    
    //암호화 한 IVMS101 데이터 저장하기
    await travelRuleManager.connect(from_vasp).setTravelRuleServiceData(travelRuleNft.address,i,signers[0].address,encodeDatakeccack_from,"SDFSES123");
    await travelRuleManager.connect(to_vasp).setTravelRuleServiceData(travelRuleNft.address,i,signers[1].address,encodeDatakeccack_to,"RQGQR12313");

    //자산 전송 및 이벤트 로그 기록 확인
    expect(await travelRuleNft.connect(signers[0]).transferFrom(signers[0].address,signers[1].address,i))
    .to.emit(travelRuleNft,"travelRuleLog")
    .withArgs(
        await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,i,signers[0].address),
        await travelRuleManager.getTravelRuleServiceData(travelRuleNft.address,i,signers[1].address)
    );
    // await delay(100)
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function testScript (
    travelRuleNft: Contract,
    travelRuleSolutionExample: Contract,
    travelRuleManager: Contract,
    from_vasp: SignerWithAddress,
    to_vasp: SignerWithAddress,
    i:number 
    )  {
    await delay(1000)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,0+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,1+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,2+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,3+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,4+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,5+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,6+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,7+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,8+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,9+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,10+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,11+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,12+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,13+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,14+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,15+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,16+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,17+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,18+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,19+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,20+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,21+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,22+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,23+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,24+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,25+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,26+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,27+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,28+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,29+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,30+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,31+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,32+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,33+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,34+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,35+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,36+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,37+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,38+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,39+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,40+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,41+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,42+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,43+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,44+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,45+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,46+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,47+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,48+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,49+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,50+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,51+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,52+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,53+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,54+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,55+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,56+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,57+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,58+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,59+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,60+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,61+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,62+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,63+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,64+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,65+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,66+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,67+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,68+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,69+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,70+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,71+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,72+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,73+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,74+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,75+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,76+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,77+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,78+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,79+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,80+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,81+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,82+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,83+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,84+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,85+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,86+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,87+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,88+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,89+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,90+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,91+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,92+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,93+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,94+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,95+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,96+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,97+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,98+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,99+i)
    await mockTx(travelRuleNft,travelRuleSolutionExample,travelRuleManager,from_vasp,to_vasp,100+i)
    await delay(1000)
}
