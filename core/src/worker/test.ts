import { processDungeon } from './claimer'
import {
  IMarketplaceListenerWorker,
  IReferralListenerWorker,
  IShardTransferListenerWorker,
  ISpoilClaimerListenerWorker
} from '../types'
import { buildLogger } from '../logger'
import { dungeonSetting, rewardDungeon } from './utils'
import { randomBytes, uuidV4 } from 'ethers'
import { writeFileSync } from 'fs'
import { processEvent } from './shard'
import { processEvent as processReferral } from './referral'
import { processEvent as processMarketplace } from './marketplace'
/* eslint-disable  @typescript-eslint/no-unused-vars */
async function dungeonGame() {
  //0xed0e5ea8958fed3f22ab20c58fb1c9be2769ccd1
  //console.log('tx', tx)
  const randomByte = randomBytes(16)
  const data: ISpoilClaimerListenerWorker = {
    txHash: uuidV4(randomByte),
    owner: '0x',
    account: '0x7f09F03faA0c283075D57BAedC1D6c57fE32fB41',
    gameType: 5,
    gameId: 1010,
    energy: 2,
    tokenId: 16
  }
  const log = buildLogger('test')
  await processDungeon(data, log)
}

async function dungeonRandom() {
  //0xed0e5ea8958fed3f22ab20c58fb1c9be2769ccd1
  // const contract = await buildContract(TestAbi, '0x9e45b7FAa8736B5dE3F36F73B827ee62f59213dC')
  // const spoilType: bigint = 1n
  // const amount: bigint = 1n
  // const message = `${spoilType},${amount}`
  // const wallet = new ethers.Wallet(SPOIL_MINTER_PRIV)
  // const signature = await wallet.signMessage(message)
  // const hash = ethers.hashMessage(message)
  // const tx = await contract.isValidSignature(spoilType, amount, signature)
  // console.log('tx', tx)
  // const data: ISpoilClaimerListenerWorker = {
  //   txHash: '0x16',
  //   owner: '0x',
  //   account: '0x7f09F03faA0c283075D57BAedC1D6c57fE32fB41',
  //   gameType: 4,
  //   gameId: 1008,
  //   energy: 2
  // }
  // const log = buildLogger('test')
  // await processD(data, log)
  //await rewardD3()
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const results: any[] = []
  // for (let i = 0; i < 1000; i++) {
  //   const reward = await rewardDungeon(1, 4)
  //   console.log(i, 'reward name', await rewardDungeon(1, 4))
  //   results.push(reward?.rewardName || '')
  // }
  //const acc = await accountBalance({ tornId: 16 })
  const dtype = 4
  for (let i = 0; i < 10000; i++) {
    //const reward = await rewardD3()
    const setting = await dungeonSetting(dtype)
    const reward = await rewardDungeon(setting.DungeonSetting, 1, 0)
    results.push(reward?.rewardName || '')
  }
  const reduce = results.reduce((p, c) => {
    if (c in p) p[c] += 1
    else p[c] = 1
    return p
  }, {})
  console.log('result', { ...reduce })
}

async function testDungeon() {
  const dtypes = [3]
  const enchanted = [0, 1000, 2500, 10000]
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const resultAllDungeon: any[] = []
  const jump = 10
  for (let j = 0; j < enchanted.length; j++) {
    const enchant = enchanted[j]

    for (let i = 0; i < dtypes.length; i++) {
      const type = dtypes[i]
      let times = 10000
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const dungeonReward: any[] = []

      const setting = await dungeonSetting(type)
      while (times > 0) {
        const results = await Promise.all(
          Array(jump)
            .fill(1)
            .map(async () => {
              const reward = await rewardDungeon(setting.DungeonSetting, 1, enchant)
              return reward?.rewardName || ''
            })
        )
        dungeonReward.push(...results)
        times -= jump
      }
      const reduce = dungeonReward.reduce((p, c) => {
        if (c in p) p[c] += 1
        else p[c] = 1
        return p
      }, {})
      const d = { dungeon: type, enchanted: enchant, rewards: reduce }
      resultAllDungeon.push(d)
      console.log('enchant', enchant, 'dungeon', type)
    }
  }
  console.log('done')

  writeFileSync('testDungeon.json', JSON.stringify(resultAllDungeon), { flag: 'w' })
}

async function testReferralClaim() {
  const data: IReferralListenerWorker = {
    txHash: '0x1000011',
    account: '0x065F2E4a1d20df82daEC64551145182A14b0BD1a',
    owner: '0x8b736035BbDA71825e0219f5FE4DfB22C35FbDDC',
    tokenId: 52,
    rewardType: 1
  }
  const log = buildLogger('test')
  await processReferral(data, log)
}

async function testShardEnchantment() {
  const data: IShardTransferListenerWorker = {
    txHash: '0x104',
    from: 'abc',
    to: '0x096e168c4cFA4d01aD50d8B87Ca7531f8eFdd980',
    value: 10000000
  }
  const log = buildLogger('test')
  await processEvent(data, log)
}

async function testMarketplaceProcess() {
  const data: IMarketplaceListenerWorker = {
    txHash: '0x101119',
    owner: '0x',
    account: '0x065F2E4a1d20df82daEC64551145182A14b0BD1a',
    itemType: 4,
    id: 3,
    itemId: 3,
    amount: 1
  }
  const log = buildLogger('test')
  await processMarketplace(data, log)
}

async function main() {
  // await dungeonGame()
  //await testDungeon()
  //testReferralClaim()
  //await tornOwnerOf(37)
  await testMarketplaceProcess()
}

main().catch((err) => {
  console.log(err)
})
