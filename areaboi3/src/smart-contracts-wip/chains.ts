/**
 * @dev
 * Celo : cUSD
 * BSC : BUSD
 * Polygon : MATIC
 */
const chains = {
  celo: {
    testnet: {
      chainId: 44787,
      url: 'https://alfajores-forno.celo-testnet.org'
    },
    mainnet: {
      chainId: 44787,
      url: 'https://forno.celo.org'
    }
  },
  polygon: {
    testnet: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com/'
    },
    mainnet: {
      chainId: 137,
      url: 'https://polygon-mainnet.infura.io/'
    }
  }
};

export default chains;
