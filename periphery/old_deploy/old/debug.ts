import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { Logger } from 'tslog'
import { ethers } from 'ethers'
import config from "../config/config";
import {MockERC20, UniswapV2Router02} from "../../dist/types";
import { bytecode } from "../../artifacts/contracts/UniswapV2Router02.sol/UniswapV2Router02.json";

const logger: Logger = new Logger()


task('add-liquidity', '')
    .setAction(async (args, hre) => {

        const oneThousand = ethers.utils.parseEther("1000");
        const lhs = await hre.ethers.getContractAt("MockERC20", config.LHS) as MockERC20;
        const rhs = await hre.ethers.getContractAt("MockERC20", config.RHS) as MockERC20;

        // await lhs.approve(config.router, oneThousand);
        // await rhs.approve(config.router, oneThousand);

        const instance = await hre.ethers.getContractAt("UniswapV2Router02", config.router) as UniswapV2Router02;

        const res = await instance.addLiquidity(
            config.LHS,
            config.RHS,
            oneThousand,
            oneThousand,
            0,
            0,
            config.testerAddress,
            Math.floor(Date.now()/1000) + 500,
            { gasLimit: 3e6 }
        );

        logger.info(res)
    })

task('send-token')
    .setAction(async (args, hre) => {
        const twentyMillion = ethers.utils.parseEther("20000000");
        const leftHandSide = await hre.ethers.getContractAt("MockERC20", config.LHS) as MockERC20;
        const rightHandSide = await hre.ethers.getContractAt("MockERC20", config.RHS) as MockERC20;
        const rewardToken = await hre.ethers.getContractAt("MockERC20", config.rewardToken) as MockERC20;
        const secondaryRewardToken = await hre.ethers.getContractAt("MockERC20", config.secondaryRewardToken) as MockERC20;

        await rewardToken.transfer(config.miniChef, twentyMillion, { gasLimit: 3e5 });
        await secondaryRewardToken.transfer(config.complexRewarderTime, twentyMillion, { gasLimit: 3e5 });
        await leftHandSide.transfer(config.testerAddress, twentyMillion, { gasLimit: 3e5 });
        await rightHandSide.transfer(config.testerAddress, twentyMillion, { gasLimit: 3e5 });
    });

task('init-hash', '')
    .setAction(async (args, hre) => {
        logger.info(ethers.utils.solidityKeccak256(['bytes'], [bytecode]));

    });