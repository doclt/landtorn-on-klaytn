import { randomInt } from 'crypto'

export function rewards() {
  // 1/2/3/4/5
  return ['Weapons', 'Wearables', 'Spoils', 'Nothing', 'Death']
}

export async function rewardD1() {
  const rd = randomInt(1, 100)
  console.log('rd', rd)
  if (rd <= 30)
    //30% weapons
    return 'Weapons'
  else if (rd <= 60) return 'Wearables'
  else if (rd <= 90) return 'Spoils'
  else return 'Nothing'
}
