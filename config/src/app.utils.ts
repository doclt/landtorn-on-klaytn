import { formatUnits, parseUnits } from 'ethers'
export function createProperty(
  name: string,
  value: number | string,
  display_value: number | string
) {
  return { name, value, display_value }
}
export function formatShard(value: bigint) {
  return formatUnits(value, 8)
}

export function parseShard(value: number) {
  return parseUnits(value.toString(), 8)
}
