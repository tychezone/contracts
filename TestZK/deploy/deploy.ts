import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import {Wallet} from "zksync-web3";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const abc = '0x7D22817D106f0a12dD117Ed9AF1A2496Bf106D07';
export default async function (hre: HardhatRuntimeEnvironment) {
        const wallet = new Wallet('');
        const deployer = new Deployer(hre, wallet);
        const artifact = await deployer.loadArtifact("UniswapV2Factory");
        console.log('Loaded');
        // Estimate contract deployment fee
        const deploymentFee = (await deployer.estimateDeployFee(artifact, [abc]));
        console.log('Fee', deploymentFee);

        // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
        // `greeting` is an argument for contract constructor.
        const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
        console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
        const factory = await deployer.deploy(artifact, [abc]);

        //obtain the Constructor Arguments
        console.log("constructor args:" + factory.interface.encodeDeploy([abc]));

        // Show the contract info.
        const contractAddress = factory.address;
        console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
    }

    //0x59E5Dd8C2252250d643D010ba438327e7c430FA3 Factory first successful deploy zksync testnet