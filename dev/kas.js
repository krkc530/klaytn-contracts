const fs = require('fs');

const CaverExtKAS = require('caver-js-ext-kas')
// Configuration Part
// Set your KAS access key and secretAccessKey.
const accessKeyId = 'KASK2QQFNAFNPCH4YTPQUI70'
const secretAccessKey = 'QbIKE9ZZNDaQETFf2eD-817Q96LrN3aPJkB87oIE'
// const CHAIN_ID_BAOBOB = '1001'
// const CHAIN_ID_CYPRESS = '8217'
const chainId = '1001'
const contractABI = JSON.parse(fs.readFileSync('build/contracts/KIP17Seller.json')).abi;
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
const tokenAddress = '0x64F67FeCB4171bE651939BBC00DE58C378EF61aB'
const token2Address = '0x02ff6342111E33673cF40F7CE01eAee2b057ac3f'
const contractAddress = '0x850Adf10af20Ce55280f3CF97a074030b7937a8c'
// User keys
const ownerPrivateKey = '0x588633762ee42a281c576a72debd1d9a2669219c484bfa1e06dabcdd7f8cf99f'
const user1PrivateKey = '0xe861d2732cbb8922353f8e8e4547835fdb45818b98584dc310e2eec0df010e40'
const user2PrivateKey = '0xbc20688ae478ddcc4d5fa658a36f2b01c0e3104d720dc7dd48b2d416802a7ae7'
// Create a KeyringContainer instance
const keyringContainer = new caver.keyringContainer()
// Add keyring to in-memory wallet
const ownerKeyring = keyringContainer.keyring.createFromPrivateKey(ownerPrivateKey)
const ownerAddress = ownerKeyring.address
const user1Keyring = keyringContainer.keyring.createFromPrivateKey(user1PrivateKey)
const user1Address = user1Keyring.address
const user2Keyring = keyringContainer.keyring.createFromPrivateKey(user2PrivateKey)
const user2Address = user2Keyring.address
keyringContainer.add(ownerKeyring)
keyringContainer.add(user1Keyring)
keyringContainer.add(user2Keyring)

  // Create a KIP17 instance
const kip17 = new caver.kct.kip17(tokenAddress)
const kip17other = new caver.kct.kip17(token2Address)
kip17.setWallet(keyringContainer)
kip17other.setWallet(keyringContainer)

// test()
airdrop()
async function airdrop() {
  const ownerSet = new Set();

  for (var tokenId=1; tokenId<=10; tokenId++) { // get owners of NFT1
    var result = await kip17.ownerOf(tokenId)
    ownerSet.add(result)
  }
  console.log("owners of NFT1")
  console.log(ownerSet)
  
  const totalSupply = await kip17other.totalSupply() // total supply < owners then halt
  console.log("total Supply of NFT2: " + totalSupply)
  if (totalSupply < ownerSet.size) {
    console.log("not enough supplies.")
    return
  }

  for (var tokenId =1; tokenId<= totalSupply; tokenId++) { // print current owners of NFT2
    var result = await kip17other.ownerOf(tokenId)
    console.log("owner of NFT2 #" + tokenId + ": " + result)
  }

  let tokenList = [1];
  tokenList = [];

  for (var i=1; i<=totalSupply; i++) { // set token list
    tokenList.push(i);
  }

  for (var address of ownerSet) {
    // randomly get token ID
    var rand = Math.floor(Math.random()*tokenList.length);
    var rValue = tokenList.splice(rand, 1)[0]

    // transfer nft2 to this address
    var transferReceipt = await kip17other.transferFrom(ownerAddress, address, rValue, { from:ownerAddress })
    console.log(`transfer receipt: `)
    console.log(transferReceipt)
  }

  for (var tokenId =1; tokenId<= totalSupply; tokenId++) { // print current owners of NFT2
    var result = await kip17other.ownerOf(tokenId)
    console.log("owner of NFT2 #" + tokenId + ": " + result)
  }
}

async function test() {
  const uri = 'https://ipfs.io/ipfs/QmVJd648F3jjTgVvyq1Q29TZf7ZRcxDzASJPS6MJurwVna'

  for (var tokenId=1; tokenId<=10; tokenId++) {
    var mintReceipt = await kip17.mintWithTokenURI(ownerAddress, tokenId, uri, { from:ownerAddress })
    console.log(`mint receipt: `)
    console.log(mintReceipt)
  }

  for (var tokenId=1; tokenId<=10; tokenId++) {
    var approveReceipt = await kip17.approve(contractAddress, tokenId, { from:ownerAddress })
    console.log(`approve receipt: `)
    console.log(approveReceipt)
  }

  const contract = new caver.contract(contractABI, contractAddress)
  contract.setWallet(keyringContainer) 
  var now = Math.floor(new Date().getTime() / 1000)
  let tokenList = [1];
  tokenList = [];

  for (var i=1; i<=10; i++) {
    tokenList.push(i);
  }

  var receipt = await contract.methods.startOnSale
    (
      tokenList,
      '100000000000000000', // 0.1 klay
      now,
      5
    )
    .send(
      {
        from: ownerAddress,
        gas: '0x4bfd200'
      })
  console.log('receipt: ')
  console.log(receipt)

  
  var receipt = await contract.methods.purchase
  (
    4
    )
    .send(
      {
        from: user1Address,
        gas: '0x4bfd200',
        value: '400000000000000000',
      })
      console.log('receipt: ')
      console.log(receipt)
      
      var receipt = await contract.methods.purchase
      (
        5
        )
        .send(
          {
            from: user2Address,
            gas: '0x4bfd200',
            value: '500000000000000000',
          })
          console.log('receipt: ')
          console.log(receipt)
          
  var receipt = await contract.methods.stopSale
    (
    )
    .send(
      {
        from: ownerAddress,
        gas: '0x4bfd200',
      })
  console.log('receipt: ')
  console.log(receipt)

  var receipt = await contract.methods.withdrawAll
    (
    )
    .send(
      {
        from: ownerAddress,
        gas: '0x4bfd200',
      })
  console.log('receipt: ')
  console.log(receipt)
}