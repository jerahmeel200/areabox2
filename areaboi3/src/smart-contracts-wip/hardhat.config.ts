import { HardhatUserConfig } from 'hardhat/config';
import { config as dot_config } from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import chains from './chains';

const PRIVATE_KEY = String(process.env.PRIVATE_KEY_0x85);

dot_config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    alfajores: {
      url: chains.celo.testnet.url,
      accounts: [`${String(PRIVATE_KEY)}`],
      chainId: chains.celo.testnet.chainId
    },

    celo: {
      url: chains.celo.mainnet.url,
      accounts: [`${String(PRIVATE_KEY)}`],
      chainId: chains.celo.mainnet.chainId
    },

    mumbai: {
      url: chains.polygon.testnet.url,
      accounts: [`${PRIVATE_KEY}`],
      chainId: chains.polygon.testnet.chainId
    },
    polygon: {
      url: chains.polygon.mainnet.url,
      accounts: [`${PRIVATE_KEY}`],
      chainId: chains.polygon.mainnet.chainId
    }
  }
};

export default config;
