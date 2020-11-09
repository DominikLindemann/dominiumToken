const DominiumToken = artifacts.require("DominiumToken.sol");
var DominiumTokenSale = artifacts.require("./DominiumTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(DominiumToken, 100000000 ).then(function() {
    // Token price is 0,0009 Ether
    // -> 20200919 ca. 0.334 USD oder 0.000032274 BTC
    var tokenPrice = 900000000000000;
    var tokenAvailable = 49000000;
    return deployer.deploy(DominiumTokenSale, DominiumToken.address, tokenPrice, tokenAvailable);
  });
};
