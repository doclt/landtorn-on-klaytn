import { ethers } from 'ethers'

export async function originalAddress(address: string) {
  return ethers.getAddress(address)
}

export function tornDefaultMeta() {
  return {
    description:
      'Take your Settlers through the Dungeons of Lorak and try to survive. Embark on a path to become a TornLord.',
    image: 'https://api.landtorn.com/torn/images/0.png'
  }
}
