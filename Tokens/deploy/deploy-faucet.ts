// load env file
import {config} from "dotenv";
config();
import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";


// load wallet private key from env file
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

if (!PRIVATE_KEY)
    throw "⛔️ Private key not detected! Add it to the .env file!";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log(`Running deploy script for the faucet contract`);

    // Initialize the wallet.
    const wallet = new Wallet(PRIVATE_KEY);

    // Create deployer object and load the artifact of the contract you want to deploy.
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact("Faucet");
    const deploymentFee = await deployer.estimateDeployFee(artifact, []);
    const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

    const tycheContract = await deployer.deploy(artifact, []);

    //obtain the Constructor Arguments
    console.log(
        "constructor args:" + tycheContract.interface.encodeDeploy([])
    );

    // Show the contract info.
    const contractAddress = tycheContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}