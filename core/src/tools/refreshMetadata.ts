import axios from 'axios'
import { OPENSEA_API_KEY, TORN_ADDRESS } from '../settings'
import { accounts } from '../apis'

const openseaHost = `https://api.opensea.io/v2`
const axiosOptions = {
  headers: {
    accept: 'application/json',
    'X-API-KEY': `${OPENSEA_API_KEY}`
  }
}

async function refreshMetadata() {
  const allAccounts = await accounts({})
  console.log(`respone ${allAccounts.length}`)

  for (let i = 0; i < allAccounts.length; i++) {
    const torn = allAccounts[i]
    const endpoint = `${openseaHost}/chain/base/contract/${TORN_ADDRESS}/nfts/${torn.id}/refresh`
    const rp = await axios.post(endpoint, {}, axiosOptions)
    console.log(`respone ${i}:`, rp.status)
    if (i % 100 == 0) {
      await new Promise((f) => setTimeout(f, 1000 * 2))
    }
  }
}

async function main() {
  await refreshMetadata()
  console.log('done')
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
