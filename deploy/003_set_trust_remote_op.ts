import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { solidityPack } = ethers.utils;

  const { deployer } = await getNamedAccounts();

  const ftmChainId = 112; // LayerZero chainId
  const ibOFTAddress = "0x15aB2Cc164d7817Ac2a5b2A6362AbeE088B7F2df";

  if (hre.network.name !== "op") {
    return;
  }

  await execute(
    "IBProxyOFT",
    { from: deployer, log: true },
    "setTrustedRemoteAddress",
    ftmChainId,
    solidityPack(["address"], [ibOFTAddress])
  );
};
export default func;
func.tags = ["trustRemote"];
