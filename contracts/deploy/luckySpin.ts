import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const config: { coordinator: string; shard: string; keyHash: string } = {
    coordinator: '0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499',
    shard: '0x64a9b3183ee8FFAfA9Ea47737eF4175753253F73',
    keyHash: '0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c'
  }
  if (network == 'cypress') {
    config.coordinator = '0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499'
    config.shard = '0x52c45D3068c937CB1e6b4A7f2c2A66b85056dD24'
    config.keyHash = '0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c'
  }
  const luckySpin = await ethers.deployContract(
    'LuckySpin',
    [config.coordinator, config.shard] //coordinator,
  )

  await luckySpin.waitForDeployment()
  console.log(`luckySpin with address: ${await luckySpin.getAddress()}`)
  const accId = 119
  const callBackGasLimit = 500_000
  await luckySpin.setConfig(config.keyHash, accId, callBackGasLimit)

  setConfig(`${network}.LuckySpin`, await luckySpin.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
