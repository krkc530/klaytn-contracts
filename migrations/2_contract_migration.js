var kip17 = artifacts.require('KIP17Token');
var kip17purchase = artifacts.require('KIP17Purchase');
module.exports = function(deployer) {
 deployer.deploy(kip17, "Test NFT", "TN")
 deployer.deploy(kip17purchase)
};