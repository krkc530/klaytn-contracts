const CaverExtKAS = require('caver-js-ext-kas')
// Configuration Part
// Set your KAS access key and secretAccessKey.
const accessKeyId = 'KASK2QQFNAFNPCH4YTPQUI70'
const secretAccessKey = 'QbIKE9ZZNDaQETFf2eD-817Q96LrN3aPJkB87oIE'
// const CHAIN_ID_BAOBOB = '1001'
// const CHAIN_ID_CYPRESS = '8217'
const chainId = '8217'
const contractAddress = '0x38aBefC20CE1Cc793DaDB9010b682628Cef0AbA7'
const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey)
test()
async function test () {
  const privateKey = '0x604483d95d92715e0df4a192e84f3ad5019e27c9c558bf5ae551902f89ff63cc'
  // Create a KeyringContainer instance
  const keyringContainer = new caver.keyringContainer()
  // Add keyring to in-memory wallet
  const keyring = keyringContainer.keyring.createFromPrivateKey(privateKey)
  keyringContainer.add(keyring)
  // Create a KIP17 instance
  const kip17 = new caver.kct.kip17(contractAddress)
  
  // Call `kip17.setWallet(keyringContainer)` to use KeyringContainer instead of KAS Wallet API
  kip17.setWallet(keyringContainer)
  const tokenId = '2'
  const uri = 'https://ipfs.io/ipfs/QmVJd648F3jjTgVvyq1Q29TZf7ZRcxDzASJPS6MJurwVna'
  const mintReceipt = await kip17.mintWithTokenURI(keyring.address, tokenId, uri, { from:keyring.address })
  console.log(`mint receipt: `)
  console.log(mintReceipt)
  // const transferReceipt = await kip17.transferFrom(keyring.address, keyring.address, tokenId, { from:keyring.address })
  // console.log(`transfer receipt: `)
  // console.log(transferReceipt)
//   const burnReceipt = await kip17.burn(tokenId, { from:keyring.address })
//   console.log(`burn receipt: `)
//   console.log(burnReceipt)
}