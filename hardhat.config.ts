import "dotenv/config";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
    ibToken: "0x00a35FD824c717879BF370E70AC6868b95870Dfb",
    lzEndpoint: {
      op: "0x3c2269811836af69497E5F486A85D7316753cf62",
      ftm: "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7",
    },
  },
  networks: {
    op: {
      url: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_TOKEN}`,
      accounts: [`0x${process.env.DEPLOY_PRIVATE_KEY ?? ""}`],
    },
    ftm: {
      url: `https://rpc.ftm.tools/`,
      accounts: [`0x${process.env.DEPLOY_PRIVATE_KEY ?? ""}`],
    },
  },
};

export default config;
