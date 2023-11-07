import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const mythic = await ethers.deployContract('Mythic')

  await mythic.waitForDeployment()
  console.log(`Mythic with address: ${await mythic.getAddress()}`)
  setConfig(`${network}.Mythic`, await mythic.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
