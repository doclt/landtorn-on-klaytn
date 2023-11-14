import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  //solidity: "0.8.19",
  networks: {
    hardhat: {},
    baobab: {
      url: 'https://api.baobab.klaytn.net:8651',
      accounts: [process.env.PR_KEY || ''],
      gasPrice: 250_000_000_000
    },
    cypress: {
      url: 'https://public-en-cypress.klaytn.net',
      accounts: [process.env.PR_KEY || '']
    }
  },
  solidity: {
    version: '0.8.19'
  },
  paths: {
    sources: './src',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ''
  }
}

export default config
