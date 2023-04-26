import {Deployer} from "@matterlabs/hardhat-zksync-deploy";
import * as ethers from "ethers";
import {Wallet} from "zksync-web3";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const abc = '0x7D22817D106f0a12dD117Ed9AF1A2496Bf106D07';
export default async function (hre: HardhatRuntimeEnvironment) {
    if(true) {
        const wallet = new Wallet('');
        const deployer = new Deployer(hre, wallet);
        const artifact = await deployer.loadArtifact("UniswapV2Router02");
        console.log('Loaded');
        // Estimate contract deployment fee
        const deploymentFee = (await deployer.estimateDeployFee(artifact, ['0x59E5Dd8C2252250d643D010ba438327e7c430FA3', '0x294cB514815CAEd9557e6bAA2947d6Cf0733f014']));
        console.log('Fee', deploymentFee);

        // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
        // `greeting` is an argument for contract constructor.
        const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
        console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
        const router = await deployer.deploy(artifact, ['0x59E5Dd8C2252250d643D010ba438327e7c430FA3', '0x294cB514815CAEd9557e6bAA2947d6Cf0733f014']);

        //obtain the Constructor Arguments
        console.log("constructor args:" + router.interface.encodeDeploy(['0x59E5Dd8C2252250d643D010ba438327e7c430FA3', '0x294cB514815CAEd9557e6bAA2947d6Cf0733f014']));

        // Show the contract info.
        const contractAddress = router.address;
        console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
    }
    else {
        const wallet = new Wallet('');
        const deployer = new Deployer(hre, wallet);
        const artifact = await deployer.loadArtifact("Multicall2");
        console.log('Loaded');
        // Estimate contract deployment fee
        const deploymentFee = (await deployer.estimateDeployFee(artifact, []));
        console.log('Fee', deploymentFee);

        // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
        // `greeting` is an argument for contract constructor.
        const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
        console.log(`The deployment is estimated to cost ${parsedFee} ETH`);
        const multicall = await deployer.deploy(artifact, []);

        //obtain the Constructor Arguments
        console.log("constructor args:" + multicall.interface.encodeDeploy([]));

        // Show the contract info.
        const contractAddress = multicall.address;
        console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
    }
}

//0x59E5Dd8C2252250d643D010ba438327e7c430FA3 Factory first successful deploy zksync testnet
// 0xA28f40669e3088C528c5053F66d9C323B2f6e42a Router first deploy


// 0x55Cead25db422098Af6AfC442E932Ee06a63b40a another router