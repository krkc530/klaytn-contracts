const fs = require('fs');

const CaverExtKAS = require('caver-js-ext-kas')
// Configuration Part
// Set your KAS access key and secretAccessKey.
const accessKeyId = 'KASK2QQFNAFNPCH4YTPQUI70'
const secretAccessKey = 'QbIKE9ZZNDaQETFf2eD-817Q96LrN3aPJkB87oIE'
// const CHAIN_ID_BAOBOB = '1001'
// const CHAIN_ID_CYPRESS = '8217'
const chainId = '1001'
const contractAddress = '0x7bDB7078B3cE65fE72D9CC55491ea9be1D2AeA8f'
const tokenAddress = '0x9314b500893539ce10617bf4667fa433c3a12942'
const contractABI = JSON.parse(fs.readFileSync('build/contracts/KIP17Seller.json')).abi;
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
test()
async function test() {
  const privateKey = '0x604483d95d92715e0df4a192e84f3ad5019e27c9c558bf5ae551902f89ff63cc'
  const myPrivateKey = '0xfcc448fc244207784bd55814a0b7e09f3d356628a069922dbe3cb898dad25146'
  // Create a KeyringContainer instance
  const keyringContainer = new caver.keyringContainer()
  // Add keyring to in-memory wallet
  const keyring = keyringContainer.keyring.createFromPrivateKey(privateKey)
  const address = keyring.address
  const key = keyring.key.privateKey
  // keyringContainer.add(keyring)
  const keyring2 = keyringContainer.keyring.createFromPrivateKey(myPrivateKey)
  const address2 = keyring2.address
  const key2 = keyring2.key.privateKey
  keyringContainer.add(keyring2)

  // Create a KIP17 instance
  const kip17 = new caver.kct.kip17(tokenAddress)

  // Call `kip17.setWallet(keyringContainer)` to use KeyringContainer instead of KAS Wallet API
  // kip17.setWallet(keyringContainer)

  const uri = 'https://ipfs.io/ipfs/QmVJd648F3jjTgVvyq1Q29TZf7ZRcxDzASJPS6MJurwVna'

  // for (var tokenId=21; tokenId<=100; tokenId++) {
  //   var mintReceipt = await kip17.mintWithTokenURI(keyring.address, tokenId, uri, { from:keyring.address })
  //   console.log(`mint receipt: `)
  //   console.log(mintReceipt)
  // }

  // for (var tokenId=21; tokenId<=100; tokenId++) {
  //   var approveReceipt = await kip17.approve(contractAddress, tokenId, { from:keyring.address })
  //   console.log(`approve receipt: `)
  //   console.log(approveReceipt)
  // }

  const contract = new caver.contract(contractABI, contractAddress)
  // contract.setWallet(keyringContainer) 
  var now = Math.floor(new Date().getTime() / 1000)
  let tokenList = [1];
  tokenList = [];

  for (var i=21; i<=100; i++) {
    tokenList.push(i);
  }

  var receipt = await contract.methods.startOnSale
    (
      tokenList,
      '100000000000000000',
      now + 180,
      5
    )
    .send(
      {
        from: keyring.address,
        gas: '0x4bfd200'
      })
  console.log('receipt: ')
  console.log(receipt)

  // var receipt = await contract.methods.stopSale
  //   (
  //   )
  //   .send(
  //     {
  //       from: keyring.address,
  //       gas: '0x4bfd200',
  //     })
  // console.log('receipt: ')
  // console.log(receipt)

  // var receipt = await contract.methods.purchase
  //   (
  //     2
  //   )
  //   .send(
  //     {
  //       from: keyring2.address,
  //       gas: '0x4bfd200',
  //       value: '200000000000000000',
  //     })
  // console.log('receipt: ')
  // console.log(receipt)

  // var receipt = await contract.methods.withdrawAll
  //   (
  //   )
  //   .send(
  //     {
  //       from: keyring.address,
  //       gas: '0x4bfd200',
  //     })
  // console.log('receipt: ')
  // console.log(receipt)
}