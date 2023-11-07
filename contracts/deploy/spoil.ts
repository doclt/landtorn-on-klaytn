import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const spoil = await ethers.deployContract('Spoil')

  await spoil.waitForDeployment()
  console.log(`spoil with address: ${await spoil.getAddress()}`)
  setConfig(`${network}.Spoil`, await spoil.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
