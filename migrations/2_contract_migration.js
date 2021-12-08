var kip17 = artifacts.require('KIP17Token');
var kip17seller = artifacts.require('KIP17Seller');
module.exports = function(deployer) {
//  deployer.deploy(kip17, "test INSU5", "TINSU5")
 deployer.deploy(kip17seller, "0x9314b500893539CE10617Bf4667fA433C3a12942")
};