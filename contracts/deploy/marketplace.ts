import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'
import { parseEther } from 'ethers'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const market = await ethers.deployContract('Marketplace', [
    '0x64a9b3183ee8FFAfA9Ea47737eF4175753253F73', //shard test
    '0xc287eCE965C9660956405D0D1d0f68d754e60D15', //spoil
    '0x3f10fA31A38619388885792ED4A216E15d8023e3', //mythic
    '0x29c923c1414F0E714d5aC90943CBfe9fA8fB3f1a' //torn
  ])

  await market.waitForDeployment()
  console.log(`MarketPlace with address: ${await market.getAddress()}`)
  setConfig(`${network}.Marketplace`, await market.getAddress())
  await updateConfig()

  await market.setRegistryAndImplementation(
    '0x463dfd16CDA31e69F78d321c3726d45D5e5426b1', //registry
    '0x4D7BB9130c4ecE2ED6b89AF663AeBc039baE7e1C' //account
  )
  console.log(`set registry and implementation`)

  await market.setBaronReward([275, 276], [13]) //spoil and mythic id
  console.log(`set Baron reward`)

  await market.setItemInEth(1, 1, parseEther('0.1'), 1) //baron setting
  console.log(`set item in eth`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
