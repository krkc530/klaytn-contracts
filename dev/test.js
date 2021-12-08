const fs = require('fs');
// import * as IPFS from 'ipfs-core'
const Caver = require('caver-js')
const caver = new Caver('http://localhost:8551')
const ownerAccount = '0x763C8F44199BE36b9F3B04AE6775B1328f3C18f9'
const ownerPrivateKey = '0x97ffef4ae3f6e4a922075a7fc0bbc8b26828fc5fc3ca5d42e7f7ea8afd79f9ab'
const contractABI = JSON.parse(fs.readFileSync('build/contracts/KIP17Seller.json')).abi;
const contract = caver.contract.create(
    contractABI, 
    '0x3E06B8BDfed31c35Ecbda6d307E687c95Df87b20',
    {from: ownerAccount}
)
const tokenAddress = '0x6DB42DDFc81ea890A03198dAa85db73e4d87aFD4'
const kip17 = new caver.kct.kip17(tokenAddress)
const tokenURI = 'testURI'
const keyring = caver.wallet.keyring.createFromPrivateKey(ownerPrivateKey)
// keyring 2 address = 0xa30c63965027c78cc6194fca4c892754d596f1a1
const keyring2 = caver.wallet.keyring.createFromPrivateKey('0xa6c6eb12e01e89ba3984ba02f57eab943c6585c42a0bc8a979c3c97de2eff566')
caver.wallet.add(keyring)
caver.wallet.add(keyring2)

kip17.options.from = ownerAccount
var now = Math.floor(new Date().getTime() / 1000)
console.log(now)
// console.log(keyring2.address)

// kip17.totalSupply().then(console.log)
// kip17.getApproved(1).then(console.log)
// kip17.getApproved(2).then(console.log)
// kip17.getApproved(3).then(console.log)
// kip17.ownerOf(1).then(console.log)
// kip17.ownerOf(2).then(console.log)
// kip17.ownerOf(3).then(console.log)


// kip17.mintWithTokenURI(ownerAccount, 1, tokenURI).then(console.log)
// kip17.mintWithTokenURI(ownerAccount, 2, tokenURI).then(console.log)
// kip17.mintWithTokenURI(ownerAccount, 3, tokenURI).then(console.log)
// kip17.approve(contract.options.address, 1).then(console.log)
// kip17.approve(contract.options.address, 2).then(console.log)
// kip17.approve(contract.options.address, 3).then(console.log)
// kip17.balanceOf(contract.options.address).then(console.log)
// kip17.balanceOf(keyring2.address).then(console.log)

// caver.rpc.klay.getBalance(ownerAccount).then(console.log)
// caver.rpc.klay.getBalance(keyring2.address).then(console.log)
// caver.rpc.klay.getBalance(contract.options.address).then(console.log)

// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     'stopSale'
// )
// .then(console.log)

// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     'startOnSale',
//     [1, 2],
//     5000, //price
//     now, //time
//     1 // max per tx
// )
// .then(console.log)

// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     'resumeSale',
// )
// .then(console.log)

// var amount = 1
// contract.send(
//     {
//         from: keyring2.address,
//         gas: 1000000,
//         value: 5000 * amount
//     },
//     'purchase',
//     amount
// )
// .then(console.log)

// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     'withdrawAll',
// )
// .then(console.log)
