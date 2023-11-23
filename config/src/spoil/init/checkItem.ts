import { PrismaClient } from '@prisma/client'
import { createReadStream } from 'fs'
import { join } from 'path'
import * as csv from 'csv-parser'

export async function checkExistedSpoil(fileName: string) {
  const prisma = new PrismaClient()
  const file = join(__dirname, '../../..', `data/${fileName}.csv`)
  const source = []
  createReadStream(file)
    .pipe(csv())
    .on('data', function (data: any) {
      source.push(data)
    })
    .on('end', async function () {
      const existedCount = []
      const newItem = []
      for (let i = 0; i < source.length; i++) {
        const data = source[i]
        try {
          const type = await prisma.spoilType.findFirst({
            where: { name: data.Type || 'NoName' },
            include: { Category: true }
          })

          const spoildb = await prisma.spoil.findFirst({
            where: {
              name: data.Weapons,
              spoilTypeId: type.id,
              dungeonTypeId: Number(data.DungeonTypeId)
            }
          })
          if (spoildb) {
            let sameStats = false
            if (
              spoildb.attack == data.ATK &&
              spoildb.defense == data.DEF &&
              spoildb.shard == data.Shard
            )
              sameStats = true
            existedCount.push({ ...spoildb, sameStats })
          } else newItem.push(data)
        } catch (error) {
          console.log(data.id, error)
        }
      }

      console.log(
        'check items: success - ',
        existedCount.length,
        {
          d1: existedCount.filter((f) => f.dungeonTypeId == 1).length,
          d2: existedCount.filter((f) => f.dungeonTypeId == 2).length,
          d3: existedCount.filter((f) => f.dungeonTypeId == 3).length,
          d4: existedCount.filter((f) => f.dungeonTypeId == 4).length,
          sameStats: existedCount.filter((f) => f.sameStats == true).length
        },
        'new item',
        { ...newItem }
      )
    })
}

async function main() {
  await checkExistedSpoil('items1-4')
}

main().catch((e) => {
  console.log(e)
  process.exitCode = 1
})
