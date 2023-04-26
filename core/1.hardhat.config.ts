
import { HardhatUserConfig, task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";


import { utils, Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

import("./deploy/index")
.catch((err) => {
  console.log("./scripts/index not imported until after build completes")
});

const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || (Wallet.createRandom()).privateKey;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const config = {
  zksolc: {
    version: "1.3.8",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncTestnet",
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
      evmVersion: "istanbul"
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    // hardhat: {
    //   gasPrice: utils.parseUnits("60", "gwei").toNumber(),
    // },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_PROJECT_ID}`,
    //   accounts: [DEPLOYER_PRIVATE_KEY],
    //   gasPrice: utils.parseUnits("150", "gwei").toNumber(),
    // },
    // evmostestnet: {
    //   url: `https://eth.bd.evmos.dev:8545`,
    //   accounts: [DEPLOYER_PRIVATE_KEY],
    //   gasPrice: utils.parseUnits("50", "gwei").toNumber(),
    // },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev",
      accounts: [DEPLOYER_PRIVATE_KEY],
      ethNetwork: "goerli", // RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },
  },
  abiExporter: {
    path: "./dist/abi",
    clear: false,
    flat: true
  },
  typechain: {
    outDir: './dist/types',
    target: 'ethers-v5',
  },
};


export default config;