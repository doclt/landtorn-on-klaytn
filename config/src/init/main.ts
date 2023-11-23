import { initDungeonType } from './dungeonType'

async function main() {
  try {
    await initDungeonType()
  } catch (error) {
    console.log('initDungeonType error', error)
  }
}

main().catch((e) => {
  console.log(e)
  process.exitCode = 1
})
