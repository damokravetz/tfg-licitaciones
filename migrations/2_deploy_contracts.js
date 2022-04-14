const Licitaciones = artifacts.require("Licitaciones.sol");

module.exports = function (deployer) {
  deployer.deploy(Licitaciones);
};
