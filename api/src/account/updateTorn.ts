import { PrismaService } from '../prisma.service'

async function insertExistedTorn() {
  const prismaService = new PrismaService()
  const accounts = await prismaService.account.findMany({
    where: { version: 2 },
    orderBy: { tokenId: 'asc' }
  })
  const settlerType = await prismaService.tornType.findFirst({ where: { name: 'Settler' } })
  const tokenIds = [
    ...new Set(
      accounts.map((m) => {
        return { id: m.tokenId, typeId: settlerType.id, status: m.status == 2 ? 0 : 1 }
      })
    )
  ]
  await prismaService.torn.createMany({ data: tokenIds })
}

insertExistedTorn().catch((e) => {
  console.log(e)
})
