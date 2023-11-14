import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const luckySpin = await ethers.deployContract(
    'LuckySpin',
    ['0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499'] //coordinator,
  )

  await luckySpin.waitForDeployment()
  console.log(`luckySpin with address: ${await luckySpin.getAddress()}`)
  const keyHash = '0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c'
  const accId = 119
  const callBackGasLimit = 500_000
  await luckySpin.setConfig(keyHash, accId, callBackGasLimit)

  setConfig(`${network}.LuckySpin`, await luckySpin.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
