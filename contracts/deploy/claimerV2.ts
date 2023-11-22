import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  //torn
  const claimer = await ethers.deployContract('ClaimerV2', [
    '0x29c923c1414F0E714d5aC90943CBfe9fA8fB3f1a'
  ])

  await claimer.waitForDeployment()
  console.log(`claimer with address: ${await claimer.getAddress()}`)
  setConfig(`${network}.ClaimerV2`, await claimer.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
