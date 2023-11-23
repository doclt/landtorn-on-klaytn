import { PrismaService } from '../prisma.service'

async function createTxType(id: number, name: string) {
  const prisma = new PrismaService()
  return await prisma.action.create({ data: { name, id } })
}

async function main() {
  await createTxType(1, 'TornMinted')
  await createTxType(2, 'FulfillClaimer')
}

main().catch((e) => {
  console.log(e)
  process.exitCode = 1
})
