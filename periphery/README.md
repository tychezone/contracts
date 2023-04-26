# Uniswap V2

Forked from uniswap/v2-periphery at commit `2efa12e0f2d808d9b49737927f0e416fafa5af68`

[![Actions Status](https://github.com/Uniswap/uniswap-v2-periphery/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-periphery/actions)
[![npm](https://img.shields.io/npm/v/@uniswap/v2-periphery?style=flat-square)](https://npmjs.com/package/@uniswap/v2-periphery)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@uniswap/v2-periphery@latest/).

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`


## Staging Deployments

```
npx hardhat node

npx hardhat deploy-multisig --network evmostestnet

npx hardhat deploy-factory --network evmostestnet

npx hardhat deploy-router --network evmostestnet
npx hardhat deploy-multicall2 --network evmostestnet

npx hardhat deploy-token --to 0x3c6e75206c1103f53004b5ae39b9F5648A37bE3e --supply 100000000 --name MockMainReward --symbol MainReward  --network evmostestnet
npx hardhat deploy-token --to 0x3c6e75206c1103f53004b5ae39b9F5648A37bE3e --supply 100000000 --name MockSecondaryReward --symbol SecondaryReward  --network evmostestnet
npx hardhat deploy-token --to 0x3c6e75206c1103f53004b5ae39b9F5648A37bE3e --supply 100000000 --name LeftHandSide --symbol LHS  --network evmostestnet
npx hardhat deploy-token --to 0x3c6e75206c1103f53004b5ae39b9F5648A37bE3e --supply 100000000 --name RightHandSide --symbol RHS  --network evmostestnet


npx hardhat add-liquidity --network evmostestnet

npx hardhat deploy-minichef --network evmostestnet
npx hardhat deploy-rewarder --network evmostestnet
npx hardhat set-emission --network evmostestnet

npx hardhat add-pool --allocpoint 100 --lptoken 0x1050C5fe822557Bc19f00491894B755FB4eD688B --network evmostestnet
npx hardhat add-pool --allocpoint 100 --lptoken 0xe820036d36e485d5905da18e4f17f20499824917 --network evmostestnet
npx hardhat add-pool --allocpoint 100 --lptoken 0x9327f82c1c9C7e73384d91877084e5c11dc704e9 --network evmostestnet
npx hardhat add-pool --allocpoint 50 --lptoken 0xAa8C7933C707152948A937e3FAED9B22EdBF63bD --network evmostestnet
npx hardhat add-pool --allocpoint 50 --lptoken 0x3a0E0a2E406C3D639259173a1E69eA1B07E4d00A --network evmostestnet
npx hardhat add-rewarder --allocpoint 100 --pid 0 --network evmostestnet
npx hardhat add-rewarder --allocpoint 100 --pid 1 --network evmostestnet
npx hardhat add-rewarder --allocpoint 50 --pid 3 --network evmostestnet

npx hardhat deploy-token --to 0x1662BfeA0Af3515baf9DAb3f0961Dc26DD35202B --supply 1000000000 --name MockUSDC --symbol MUSDC  --network evmostestnet
npx hardhat deploy-token --to 0x1662BfeA0Af3515baf9DAb3f0961Dc26DD35202B --supply 1000000000 --name MockEVMOS --symbol MEVMOS  --network evmostestnet
npx hardhat deploy-token --to 0x1662BfeA0Af3515baf9DAb3f0961Dc26DD35202B --supply 1000000000 --name MockATOM --symbol MATOM  --network evmostestnet
npx hardhat deploy-token --to 0x1662BfeA0Af3515baf9DAb3f0961Dc26DD35202B --supply 1000000000 --name MockOSMOSIS --symbol MOSMOSIS  --network evmostestnet
```