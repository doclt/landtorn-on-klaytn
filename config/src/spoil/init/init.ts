import { PrismaService } from '../../prisma.service'
import { SpoilCategoryDto, SpoilDto, SpoilTypeDto } from '../dto/spoil.dto'
import { createReadStream } from 'fs'
import * as csv from 'csv-parser'
import { join } from 'path'
import { createProperty } from '../../app.utils'
import { Metadata } from 'src/app.types'
import { ISpoil } from '../spoil.types'
import { API_URL } from 'src/app.settings'
import { writeFile } from 'fs/promises'

/* eslint-disable @typescript-eslint/no-unused-vars */
async function initCategory() {
  const prisma = new PrismaService()
  const data: SpoilCategoryDto[] = [
    // { name: 'Weapons' },
    // { name: 'Wearables' },
    // { name: 'Spoils' },
    //{ id: 4, name: 'Airdrop' }
  ]
  await prisma.spoilCategory.createMany({ data })
  console.log('init category: success')
}

async function initType() {
  const prisma = new PrismaService()
  // const weapon = await prisma.spoilCategory.findFirst({ where: { name: 'Weapons' } })
  // const wearable = await prisma.spoilCategory.findFirst({ where: { name: 'Wearables' } })
  // const spoil = await prisma.spoilCategory.findFirst({ where: { name: 'Spoils' } })
  const airdrop = await prisma.spoilCategory.findFirst({ where: { name: 'Airdrop' } })

  const data: SpoilTypeDto[] = [
    // { name: 'Hand Weapon', categoryId: weapon.id },
    // { name: 'Arrows', categoryId: weapon.id },
    // { name: 'Bows', categoryId: weapon.id },
    // { name: 'Boots', categoryId: wearable.id },
    // { name: 'Pants', categoryId: wearable.id },
    // { name: 'Belt', categoryId: wearable.id },
    // { name: 'Hood', categoryId: wearable.id },
    // { name: 'Mask', categoryId: wearable.id },
    // { name: 'Shoulder Plate', categoryId: wearable.id },
    // { name: 'Armor Plate', categoryId: wearable.id },
    // { name: 'Chest Piece', categoryId: wearable.id },
    // { name: 'NoName', categoryId: spoil.id },
    { id: 13, name: 'Warrior', categoryId: airdrop.id }
  ]
  await prisma.spoilType.createMany({ data })
  console.log('init Type: success')
}

async function createMetadata(spoil: ISpoil) {
  const metadata: Metadata = {
    name: spoil.name,
    description: spoil.description,
    image: spoil.image,
    properties: {
      shardValue: spoil.shard,
      type: createProperty('Type', spoil.type, spoil.type),
      category: createProperty('Category', spoil.category, spoil.category),
      atk: createProperty('ATK', spoil.ATK, spoil.ATK),
      def: createProperty('DEF', spoil.DEF, spoil.DEF),
      shard: createProperty('Shard', spoil.shard, spoil.shard)
    }
  }
  return metadata
}

async function createSpoil(fileName: string) {
  const prisma = new PrismaService()
  const file = join(__dirname, '../../..', `data/${fileName}.csv`)
  createReadStream(file)
    .pipe(csv())
    .on('data', async function (data: any) {
      try {
        const type = await prisma.spoilType.findFirst({
          where: { name: data.Type || 'NoName' },
          include: { Category: true }
        })
        const image = `${data.Id}.png`
        const spoilData: SpoilDto = {
          id: Number(data.Id),
          name: data.Weapons || '',
          attack: Number(data.ATK || 0),
          defense: Number(data.DEF) || 0,
          shard: Number(data.Shard || 0),
          spoilTypeId: type.id,
          imageUrl: image,
          dungeonTypeId: Number(data.DungeonTypeId)
        }

        const spoildb = await prisma.spoil.upsert({
          where: {
            name: data.Weapons,
            spoilTypeId: type.id,
            dungeonTypeId: Number(data.DungeonTypeId)
          },
          create: { ...spoilData },
          update: { attack: spoilData.attack, defense: spoilData.defense, shard: spoilData.shard }
        })
        const jsonDir = join(__dirname, '../../../..', '/api/data/spoil/meta/')

        const tokenTypeId = spoildb.id
        //const image = `${API_URL}/spoil/images/${tokenTypeId}.png`
        const meta: ISpoil = {
          name: spoildb.name,
          description: '',
          image: `${API_URL}/spoil/images/${data.Id}.png`,
          type: type.name,
          category: type.Category.name,
          ATK: spoildb.attack,
          DEF: spoildb.defense,
          shard: spoildb.shard
        }
        const jsonData = await createMetadata(meta)
        await writeFile(join(jsonDir, `${tokenTypeId}.json`), JSON.stringify(jsonData))
      } catch (error) {
        console.log(data.id, error)
      }
    })
    .on('end', function () {
      console.log('insert items: success')
    })
}

async function main() {
  // try {
  //   await initCategory()
  // } catch (error) {
  //   console.log('init category error', error)
  // }
  // try {
  //   await initType()
  // } catch (error) {
  //   console.log('initType', error)
  // }
  //await checkExistedSpoil('Item1-4')
  // await createSpoil('items1-4')
  await createSpoil('itemsD10')
}

main().catch((e) => {
  console.log(e)
  process.exitCode = 1
})
