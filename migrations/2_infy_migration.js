const Migrations = artifacts.require("InfyCoin");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
