var kip17 = artifacts.require('KIP17Token');
var kip17seller = artifacts.require('KIP17Seller');
module.exports = function(deployer) {
//  deployer.deploy(kip17, "test NFT", "TN")
 deployer.deploy(kip17seller, "0xB4E975fd4E0E1B7B71fb3DCcEc6e0a362fB30122")
};