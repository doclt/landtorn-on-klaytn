import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  const luckySpin = await ethers.deployContract(
    'LuckySpin',
    ['0x3F247f70DC083A2907B8E76635986fd09AA80EFb', '0x52c45D3068c937CB1e6b4A7f2c2A66b85056dD24'] //coordinator,
  )

  await luckySpin.waitForDeployment()
  console.log(`luckySpin with address: ${await luckySpin.getAddress()}`)
  const keyHash = '0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157'
  const accId = 119
  const callBackGasLimit = 2_500_000
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
