import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const shard = await ethers.deployContract('SHARDTEST')

  await shard.waitForDeployment()
  console.log(`shard with address: ${await shard.getAddress()}`)
  setConfig(`${network}.Shard`, await shard.getAddress())
  await updateConfig()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
