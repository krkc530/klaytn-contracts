var kip17 = artifacts.require('KIP17Token');
var kip17seller = artifacts.require('KIP17Seller');
module.exports = function(deployer) {
 deployer.deploy(kip17, "test NFT2", "TNFT2")
//  deployer.deploy(kip17seller, "0x64F67FeCB4171bE651939BBC00DE58C378EF61aB")
};