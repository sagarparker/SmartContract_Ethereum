require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.private_key


module.exports = {
  networks: {
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://kovan.infura.io/v3/7a0de82adffe468d8f3c1e2183b37c39`// Url to an Ethereum Node
        )
      },
      gas:10000000,
      gasPrice:5000000000,
      network_id: 42,
      networkCheckTimeout: 999999
    }
  },
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}