import { writeFile } from 'fs/promises'
import {
  increaseEnergy,
  marketItem,
  refreshSettlerMeta,
  updateMythic,
  updateSpoil,
  updateTorn
} from '../apis'
import { MYTHIC_MINTER_PRIV } from '../settings'
import { mythicMintBatch, spoilMintBatch } from '../worker/utils'
import { IResultBaronUpdate } from './type'
import { readFileSync } from 'fs'
import { resolve } from 'path'

async function upgradeBaron() {
  const resultFilePath = `${resolve()}/src/tools/data/updatedAccount.${new Date().getTime()}.json`
  const sourceFilePath = `${resolve()}/src/tools/data/account.json`
  const accounts = JSON.parse(readFileSync(sourceFilePath, { encoding: 'utf8' }))
  const spoils = [275, 276]
  const mythics = [13]
  const spoilAmount = 1
  const updatedAccount: IResultBaronUpdate[] = []
  for (let i = 0; i < accounts.length; i++) {
    try {
      const acc = accounts[i]
      //send spoil, mythic
      const spoilTx = await spoilMintBatch(acc.account, spoils, [1, 1])
      const mythicTx = await mythicMintBatch(acc.account, mythics, [1], MYTHIC_MINTER_PRIV)

      //update torn type to Baron
      await updateTorn({ account: acc.account, typeId: 2 })

      //increase energy
      const itemInfor = await marketItem({ id: 3 }) //life vial package
      await increaseEnergy({ account: acc.account, energy: itemInfor.value })
      // spoil
      await updateSpoil({ account: acc.account, spoilId: spoils[0], amount: spoilAmount })
      await updateSpoil({ account: acc.account, spoilId: spoils[1], amount: spoilAmount })

      await updateMythic({ account: acc.account, mythicId: mythics[0], amount: spoilAmount })
      //refresh opensea meta
      await refreshSettlerMeta(acc.tokenId)
      const resultData: IResultBaronUpdate = {
        spoilTx: spoilTx.hash,
        mythicTx: mythicTx.hash,
        account: acc.account,
        tokenId: acc.tokenId
      }
      updatedAccount.push(resultData)

      console.log(`result `, resultData)
    } catch (error) {
      console.log('error', error)
    }
    await writeFile(resultFilePath, JSON.stringify(updatedAccount, null, 4))
  }
}

async function main() {
  await upgradeBaron()
}

main().catch((err) => {
  console.log(err)
})
