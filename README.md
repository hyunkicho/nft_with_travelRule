본 저장소는 서강대학교 정보통신대학 블록체인학과 졸업 논문
"ERC721 표준 NFT에 FATF의 트레블룰을 적용하는 방안에 대한 연구"
에 대한 실제 코드 입니다.


1. 모듈 설치
```
npm install
```

2. 테스트 진행
```
npx hardhat test
```

테스트 결과값
```
hyunkicho@Hyunkiui-MacBookPro nft_with_travelRule % npx hardhat test

  Starting test with constants
    ✓ start all the test

  Starting test with constants
    ✓ start erc721 test

  deploy TravelRuleManager
    ✓ Should Deploy TravelRuleManager correctly

  deploy nftExample
    ✓ Should Deploy TravelRuleNft correctly

  deploy travleRuleSolutionExample
    ✓ Should Deploy travelRuleSolutionExample_1 correctly

  deploy travleRuleSolutionExample_2
    ✓ Should Deploy travelRuleSolutionExample_2 correctly

  Travel rule service must register their address to Travel Rule manager
    ✓ register from_vasp to TravelRuleManager
    ✓ TravelRuleManager Must be registerd
    ✓ register to_vasp to TravelRuleManager
    ✓ TravelRuleManager Must be registerd

  Travel Rule manage can register 
    ✓ register from_customer to TravelRuleManager
    ✓ TravelRuleManager Must be registerd
    ✓ register to_customer to TravelRuleManager
    ✓ TravelRuleManager Must be registerd

  mint example NFT to from_customer
    ✓ mint NFT example
    ✓ owner must be correct

  [update from_customer info]If travelRule service have on chian system it should contain updateInfromation
    ✓ register setTravelRuleServiceData to TravelRuleManager
get from_customer data >>>>>>>>>>>>> [
  '0x18d335cad98867f18347fd0350cf8f6e91a42884a9e51983533e9833ef1c8b8a',
  '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  '0x3661ea5828fe37bb18bb5bf4ffd4a17c301e7555b4644cfa92a9ae4a80d97e4e',
  '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  '0x199e9bde300d1a68f79de2d919bbe08e99725d5c3f2513d7717d2e430eaa9b60',
  '0x4001584328913bf34665a46a4e1ec8d01e784970586409d80adb3ab31de2dcad',
  '0x406eeac6c4edd3398b7d810f87407ca4587b9bc9b4a44bad12a5b8809c70ed13',
  userCode: '0x18d335cad98867f18347fd0350cf8f6e91a42884a9e51983533e9833ef1c8b8a',
  userType: '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  name: '0x3661ea5828fe37bb18bb5bf4ffd4a17c301e7555b4644cfa92a9ae4a80d97e4e',
  nameID: '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  user_address: '0x199e9bde300d1a68f79de2d919bbe08e99725d5c3f2513d7717d2e430eaa9b60',
  datesAndPlacOfBirth: '0x4001584328913bf34665a46a4e1ec8d01e784970586409d80adb3ab31de2dcad',
  NationalIdentification: '0x406eeac6c4edd3398b7d810f87407ca4587b9bc9b4a44bad12a5b8809c70ed13'
]
    ✓ check travle rule service data

  [update to_vasp info]If travelRule service have on chian system it should contain updateInfromation
    ✓ setTravelRuleServiceData of from_customer to TravelRuleManager
    ✓ setTravelRuleServiceData of to_customer TravelRuleManager_2
get to_vasp data >>>>>>>>>>>>> [
  '0xb5403aad7f2d010a5bfec2b28cd932ee77d47bbfb70a6e515ad4557640e43303',
  '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  '0x538385f7ef30cfb93f56d8630c58b37a41469631ad5139bcc5ef72a0682d3681',
  '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  '0xb2e62219e7a38e08a9410b830e7065839ba0149ac43232f4b389f501cd479349',
  '0xa486c3305ec7796c778cbb2b34741f1fd4741e28b0e7b70a9e926ec9143a8213',
  '0x2e312c26237f0bdc92c37ea7bdcffc6ca22ce1b223ea08ba8982cbbf0f9dc78c',
  userCode: '0xb5403aad7f2d010a5bfec2b28cd932ee77d47bbfb70a6e515ad4557640e43303',
  userType: '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  name: '0x538385f7ef30cfb93f56d8630c58b37a41469631ad5139bcc5ef72a0682d3681',
  nameID: '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  user_address: '0xb2e62219e7a38e08a9410b830e7065839ba0149ac43232f4b389f501cd479349',
  datesAndPlacOfBirth: '0xa486c3305ec7796c778cbb2b34741f1fd4741e28b0e7b70a9e926ec9143a8213',
  NationalIdentification: '0x2e312c26237f0bdc92c37ea7bdcffc6ca22ce1b223ea08ba8982cbbf0f9dc78c'
]
    ✓ check travle rule service data

  Travel rule service could set Travel Rule Service Data if they want
    ✓ setTravelRuleServiceData to TravelRuleManager with vasp code
    ✓ check if travel rule log is recorded
[
  '0x9dabb3f2ba8de1baeaed004a4879be78b7569efb83cd36e9cefd856b3f5a5184',
  'SDFSES123',
  _travelRuleServiceData: '0x9dabb3f2ba8de1baeaed004a4879be78b7569efb83cd36e9cefd856b3f5a5184',
  _vaspCode: 'SDFSES123'
]
    ✓ travle rule log can be decoded back, check with from data
[
  '0xf2f17143fb0ec2105350af228a93fef9c58e9085cc4d351a120e9eb47b6c79fd',
  'RQGQR12313',
  _travelRuleServiceData: '0xf2f17143fb0ec2105350af228a93fef9c58e9085cc4d351a120e9eb47b6c79fd',
  _vaspCode: 'RQGQR12313'
]
    ✓ travle rule log can be decoded back, check with to data

  deploy ERC721
    ✓ Should Deploy ERC721 correctly

  mint example NFT to from_customer
    ✓ mint NFT example
    ✓ owner must be correct
    ✓ transferFrom NFT example
    ✓ owner must be correct

·----------------------------------------------------------|----------------------------|-------------|-----------------------------·
|                   Solc version: 0.8.4                    ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
···························································|····························|·············|······························
|  Methods                                                                                                                          │
······························|····························|··············|·············|·············|···············|··············
|  Contract                   ·  Method                    ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
······························|····························|··············|·············|·············|···············|··············
|  ERC721Example              ·  mint                      ·           -  ·          -  ·     150762  ·            1  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  ERC721Example              ·  transferFrom              ·           -  ·          -  ·      58657  ·            1  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleManager          ·  register                  ·       46395  ·      46407  ·      46401  ·            2  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleManager          ·  setCustomer               ·           -  ·          -  ·      46492  ·            2  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleManager          ·  setTravelRuleServiceData  ·      161462  ·     161486  ·     161474  ·            2  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleNft              ·  mint                      ·           -  ·          -  ·     150836  ·            1  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleNft              ·  transferFrom              ·           -  ·          -  ·     107139  ·            2  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  TravelRuleSolutionExample  ·  updateInfo                ·       56188  ·     184288  ·     141588  ·            3  ·          -  │
······························|····························|··············|·············|·············|···············|··············
|  Deployments                                             ·                                          ·  % of limit   ·             │
···························································|··············|·············|·············|···············|··············
|  ERC721Example                                           ·           -  ·          -  ·    2938188  ·        9.8 %  ·          -  │
···························································|··············|·············|·············|···············|··············
|  TravelRuleManager                                       ·           -  ·          -  ·    1099425  ·        3.7 %  ·          -  │
···························································|··············|·············|·············|···············|··············
|  TravelRuleNft                                           ·           -  ·          -  ·    3230099  ·       10.8 %  ·          -  │
···························································|··············|·············|·············|···············|··············
|  TravelRuleSolutionExample                               ·           -  ·          -  ·     644512  ·        2.1 %  ·          -  │
·----------------------------------------------------------|--------------|-------------|-------------|---------------|-------------·

  30 passing (3s)
```

3. UML 생성 - 생성할 경로에 들어간 후 파일 지정하여 명령어 실행
```
sol2uml ./TravelRuleSolutionExample.sol
```
4. 테스트 코드 커버리지 확인
```
npx hardhat coverage
```
테스트 코드 커버리지 결과값
```
hyunkicho@Hyunkiui-MacBookPro nft_with_travelRule % npx hardhat coverage

Version
=======
> solidity-coverage: v0.7.21

Instrumenting for coverage...
=============================

> ERC721TravelRuleExtension.sol
> Example/ERC721.sol
> Example/TravelRuleNft.sol
> Example/TravelRuleSolutionExample.sol
> TravelRuleManager.sol

Compilation:
============

Nothing to compile

Network Info
============
> HardhatEVM: v2.9.6
> network:    hardhat



  Starting test with constants
    ✔ start all the test

  Starting test with constants
    ✔ start erc721 test

  deploy TravelRuleManager
    ✔ Should Deploy TravelRuleManager correctly (148ms)

  deploy nftExample
    ✔ Should Deploy TravelRuleNft correctly (256ms)

  deploy travleRuleSolutionExample
    ✔ Should Deploy travelRuleSolutionExample_1 correctly (78ms)

  deploy travleRuleSolutionExample_2
    ✔ Should Deploy travelRuleSolutionExample_2 correctly (68ms)

  Travel rule service must register their address to Travel Rule manager
    ✔ register from_vasp to TravelRuleManager
    ✔ TravelRuleManager Must be registerd
    ✔ testing Only owner in TravelRuleManager (41ms)
    ✔ register to_vasp to TravelRuleManager
    ✔ TravelRuleManager Must be registerd

  Travel Rule manage can register 
    ✔ register from_customer to TravelRuleManager
    ✔ TravelRuleManager Must be registerd
    ✔ register to_customer to TravelRuleManager
    ✔ testing Only registerd in TravelRuleManager
    ✔ TravelRuleManager Must be registerd

  mint example NFT to from_customer
    ✔ mint NFT example (76ms)
    ✔ owner must be correct

  [update from_customer info]If travelRule service have on chian system it should contain updateInfromation
    ✔ register setTravelRuleServiceData to TravelRuleManager (53ms)
get from_customer data >>>>>>>>>>>>> [
  '0x18d335cad98867f18347fd0350cf8f6e91a42884a9e51983533e9833ef1c8b8a',
  '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  '0x3661ea5828fe37bb18bb5bf4ffd4a17c301e7555b4644cfa92a9ae4a80d97e4e',
  '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  '0x199e9bde300d1a68f79de2d919bbe08e99725d5c3f2513d7717d2e430eaa9b60',
  '0x4001584328913bf34665a46a4e1ec8d01e784970586409d80adb3ab31de2dcad',
  '0x406eeac6c4edd3398b7d810f87407ca4587b9bc9b4a44bad12a5b8809c70ed13',
  userCode: '0x18d335cad98867f18347fd0350cf8f6e91a42884a9e51983533e9833ef1c8b8a',
  userType: '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  name: '0x3661ea5828fe37bb18bb5bf4ffd4a17c301e7555b4644cfa92a9ae4a80d97e4e',
  nameID: '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  user_address: '0x199e9bde300d1a68f79de2d919bbe08e99725d5c3f2513d7717d2e430eaa9b60',
  datesAndPlacOfBirth: '0x4001584328913bf34665a46a4e1ec8d01e784970586409d80adb3ab31de2dcad',
  NationalIdentification: '0x406eeac6c4edd3398b7d810f87407ca4587b9bc9b4a44bad12a5b8809c70ed13'
]
    ✔ check travle rule service data

  [update from_customer's and to_customer's VASP info]
    ✔ setVaspCode
    ✔ getVaspCode
    ✔ check travle rule service data
    ✔ getVaspCode

  [update to_vasp info]If travelRule service have on chian system it should contain updateInfromation
    ✔ setTravelRuleServiceData of to_customer TravelRuleManager_2 (61ms)
get to_vasp data >>>>>>>>>>>>> [
  '0xb5403aad7f2d010a5bfec2b28cd932ee77d47bbfb70a6e515ad4557640e43303',
  '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  '0x538385f7ef30cfb93f56d8630c58b37a41469631ad5139bcc5ef72a0682d3681',
  '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  '0xb2e62219e7a38e08a9410b830e7065839ba0149ac43232f4b389f501cd479349',
  '0xa486c3305ec7796c778cbb2b34741f1fd4741e28b0e7b70a9e926ec9143a8213',
  '0x2e312c26237f0bdc92c37ea7bdcffc6ca22ce1b223ea08ba8982cbbf0f9dc78c',
  userCode: '0xb5403aad7f2d010a5bfec2b28cd932ee77d47bbfb70a6e515ad4557640e43303',
  userType: '0x10a5ba217f6b440535520478051b9ff4b393b94a8a1145c46b7b5c0acd14e1e0',
  name: '0x538385f7ef30cfb93f56d8630c58b37a41469631ad5139bcc5ef72a0682d3681',
  nameID: '0xf687450d69a609f17988f7cdb8ec1b53a7adffda29c349da6d1a02415844adad',
  user_address: '0xb2e62219e7a38e08a9410b830e7065839ba0149ac43232f4b389f501cd479349',
  datesAndPlacOfBirth: '0xa486c3305ec7796c778cbb2b34741f1fd4741e28b0e7b70a9e926ec9143a8213',
  NationalIdentification: '0x2e312c26237f0bdc92c37ea7bdcffc6ca22ce1b223ea08ba8982cbbf0f9dc78c'
]
    ✔ check travle rule service data

  Travel rule service could set Travel Rule Service Data if they want
    ✔ setTravelRuleServiceData to TravelRuleManager with vasp code (178ms)
    ✔ check if travel rule log is recorded (205ms)
[
  '0x7fc60fd88c355b6ed382b8dcb4d01d13a515883606639917b9ed1cf27adb79b6',
  'SDFSES123',
  _travelRuleServiceData: '0x7fc60fd88c355b6ed382b8dcb4d01d13a515883606639917b9ed1cf27adb79b6',
  _vaspCode: 'SDFSES123'
]
    ✔ travle rule log can be decoded back, check with from data (51ms)
[
  '0xf2f17143fb0ec2105350af228a93fef9c58e9085cc4d351a120e9eb47b6c79fd',
  'RQGQR12313',
  _travelRuleServiceData: '0xf2f17143fb0ec2105350af228a93fef9c58e9085cc4d351a120e9eb47b6c79fd',
  _vaspCode: 'RQGQR12313'
]
    ✔ travle rule log can be decoded back, check with to data (62ms)

  deploy ERC721
    ✔ Should Deploy ERC721 correctly (200ms)

  mint example NFT to from_customer
    ✔ mint NFT example (87ms)
    ✔ owner must be correct
    ✔ transferFrom NFT example (56ms)
    ✔ owner must be correct

  burn example NFT to from_customer
    ✔ burn NFT example (57ms)

  deploy TravelRuleManager
    ✔ Should Deploy TravelRuleManager correctly (81ms)

  deploy travelRuleNFT
    ✔ Should Deploy TravelRuleNft correctly (200ms)

  mint travelRuleNFT to from_customer
    ✔ mint travelRuleNFT example (95ms)
    ✔ owner must be correct
    ✔ transferFrom NFT example (46ms)
    ✔ owner must be correct

  burn travelRuleNFT to from_customer
    ✔ burn travelRuleNFT example


  43 passing (3s)

--------------------------------|----------|----------|----------|----------|----------------|
File                            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------------------|----------|----------|----------|----------|----------------|
 contracts/                     |      100 |       80 |    90.91 |      100 |                |
  ERC721TravelRuleExtension.sol |      100 |     87.5 |      100 |      100 |                |
  TravelRuleManager.sol         |      100 |       50 |     87.5 |      100 |                |
 contracts/Example/             |      100 |      100 |      100 |      100 |                |
  ERC721.sol                    |      100 |      100 |      100 |      100 |                |
  TravelRuleNft.sol             |      100 |      100 |      100 |      100 |                |
  TravelRuleSolutionExample.sol |      100 |      100 |      100 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
All files                       |      100 |       80 |    95.45 |      100 |                |
--------------------------------|----------|----------|----------|----------|----------------|
```