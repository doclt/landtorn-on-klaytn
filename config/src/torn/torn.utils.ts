export function createProperty(
  name: string,
  value: number | string,
  display_value: number | string
) {
  return { name, value, display_value }
}

export function tokenTypeName(id: number) {
  switch (id) {
    case 1:
      return 'Torn'
    case 2:
      return 'Paladin'
    case 3:
      return 'IronFist'
    default:
      return 'Torn'
  }
}
