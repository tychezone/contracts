import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import { Logger } from 'tslog'
import { ethers } from 'ethers'
import config from "../config/config";

const logger: Logger = new Logger()

task('deploy-router', 'Deploys UniswapV2Router02 contract')
    .setAction(async (args, hre) => {
        const factory = await hre.ethers.getContractFactory(`contracts/UniswapV2Router02.sol:UniswapV2Router02`)
        const instance = await factory.deploy(config.factory, config.weth9)

        await instance.deployed()

        logger.info(instance.address)
    })


task("verify-router", "Verifies factory Contract")
    .setAction(
        async (args, hre) => {
            await hre.run("verify:verify", {
                address: config.router,
                constructorArguments: [config.factory, config.weth9],
                contract: "contracts/UniswapV2Router02.sol:UniswapV2Router02"
            });
        }
    );

task('deploy-multicall2', 'Deploys Multicall2 contract')
    .setAction(async (args, hre) => {
        const factory = await hre.ethers.getContractFactory(`contracts/Multicall2.sol:Multicall2`)
        const instance = await factory.deploy()

        await instance.deployed()

        logger.info(instance.address)
    })

task('deploy-token', 'Deploys MockERC20 contract')
    .addParam("to", "address to send tokens to")
    .addParam("supply", "Supply to mint (in whole values)")
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .setAction(async (args, hre) => {
        const factory = await hre.ethers.getContractFactory(`contracts/test/MockERC20.sol:MockERC20`)
        const instance = await factory.deploy(args.to, ethers.utils.parseEther(args.supply), args.name, args.symbol)

        await instance.deployed()

        logger.info(instance.address)
    })