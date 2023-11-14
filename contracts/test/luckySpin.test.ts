import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import exp from 'constants'
import { parseEther, parseUnits } from 'ethers'
import { ethers } from 'hardhat'

describe('Lucky spin deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()
    const LuckySpin = await ethers.getContractFactory('LuckySpin')
    const luckySpin = await LuckySpin.deploy('0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499')

    return {
      luckySpin,
      deployer
    }
  }

  describe('Lucky spin', function () {
    it('set chance, set config', async function () {
      const { luckySpin, deployer } = await loadFixture(deployFixture)
      await (await luckySpin.setChance(0, 1, 8000)).wait()
      const { reward, ratio } = await luckySpin.sChance(0)
      expect(reward).to.be.equal(1)
      expect(ratio).to.be.equal(8000)
      const keyHash = '0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c'
      const accId = 119
      const callBackGasLimit = 500_000
      await (await luckySpin.setConfig(keyHash, accId, callBackGasLimit)).wait()
      expect(await luckySpin.sKeyHash()).to.be.equal(keyHash)
      expect(await luckySpin.sAccId()).to.be.equal(accId)
      expect(await luckySpin.sCallbackGasLimit()).to.be.equal(callBackGasLimit)
    })
  })
})
