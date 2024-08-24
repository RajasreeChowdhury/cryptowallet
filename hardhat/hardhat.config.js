require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/de2fae9a5a454b48bfc2df7fcb9bed5b",
      accounts: ["b1020f042871aafd6f659dc1a948ee0ebaeb4733520f9f61f4a30220f1a093b3"]
    }
  }
};