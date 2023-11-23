import { PrismaService } from '../prisma.service'

// repair for dungeon 2
export async function initDungeonType() {
  const prisma = new PrismaService()
  const data = [
    {
      id: 1,
      name: 'Dungeon 1'
    },
    {
      id: 2,
      name: 'Dungeon 2'
    },
    {
      id: 3,
      name: 'Dungeon 3'
    },
    {
      id: 4,
      name: 'Dungeon 4'
    },
    {
      id: 5,
      name: 'Dungeon 5'
    },
    {
      id: 6,
      name: 'Dungeon 6'
    },
    {
      id: 7,
      name: 'Dungeon 7'
    },
    {
      id: 8,
      name: 'Dungeon 8'
    },
    {
      id: 9,
      name: 'Dungeon 9'
    },
    {
      id: 10,
      name: 'Dungeon 10'
    }
  ]
  await prisma.dungeonType.createMany({ data })
  console.log('init dungeonType: success')
}
