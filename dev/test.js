const fs = require('fs');
const Caver = require('caver-js')
const caver = new Caver('http://localhost:8551/')
const ownerAccount = '0x2a23629067da269093f6c8a3E47c91AF65427F95'
const contractABI = JSON.parse(fs.readFileSync('build/contracts/KIP17Purchase.json')).abi;
const contract = caver.contract.create(
    contractABI, 
    '0xc557b6Ce555E76aF03499b35ab0129eb4521A670',
    {from: ownerAccount}
)
const tokenAddress = '0x10485d72042De8Fb501F66232c886236C7C5d73e'
const kip17 = new caver.kct.kip17(tokenAddress)
const tokenURI = 'testURI'

const keyring = caver.wallet.keyring.createFromPrivateKey('0x3fcc370287feaf719fcb0fe1f65b6f106087b582af1d50766d2fa0e2b4a788a1')
const keyring2 = caver.wallet.keyring.createFromPrivateKey('0x817e97452ae29050c7c11a0b023826b7055bbc19d6ec9e8b3752e744fa9f11f5')
const keyring3 = caver.wallet.keyring.createFromPrivateKey('0x77d730a58df7906d97a61c78f0b5fa8aa45e0f88ff2d4e282b5448b7abceee42')
caver.wallet.add(keyring)
caver.wallet.add(keyring2)
caver.wallet.add(keyring3)

kip17.totalSupply().then(console.log)

kip17.options.from = ownerAccount
// kip17.mintWithTokenURI(contract.options.address, 8, tokenURI).then(console.log)
// kip17.balanceOf(contract.options.address).then(console.log)

kip17.ownerOf(8).then(console.log)
// kip17.balanceOf(keyring2.address).then(console.log)
// caver.rpc.klay.getBalance(ownerAccount).then(console.log)
// caver.rpc.klay.getBalance(keyring2.address).then(console.log)
// caver.rpc.klay.getBalance(keyring3.address).then(console.log)
// contract.send(
//     {
//         from: keyring2.address,
//         gas: 1000000,
//         value: 5,
//     },
//     'purchase',
//     tokenAddress,
//     7
// )
// .then(console.log)
// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     'setTokenPrice',
//     tokenAddress,
//     7,
//     5
// )
// .then(console.log)
// contract.send(
//     {
//         from: ownerAccount,
//         gas: 1000000,
//     },
//     '_setTokenLaunchTime',
//     6,
//     10
// )
// .then(console.log)
// contract.call('tokenPrice', 1).then(console.log)
// contract.call('tokenSellTime', 1).then(console.log)
// .on('transactionHash', function(hash) {
//     console.log(hash)
//   })
// .on('receipt', function(receipt) {
// console.log(receipt)
// })
// .on('error', console.error)
