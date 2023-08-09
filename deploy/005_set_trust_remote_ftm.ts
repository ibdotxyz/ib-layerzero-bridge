import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { solidityPack } = ethers.utils;

  const { deployer } = await getNamedAccounts();

  const opChainId = 111; // LayerZero chainId
  const ibProxyOFTAddress = "";

  if (hre.network.name !== "ftm") {
    return;
  }

  await execute(
    "IBProxyOFT",
    { from: deployer, log: true },
    "setTrustedRemoteAddress",
    opChainId,
    solidityPack(["address"], [ibProxyOFTAddress])
  );
};
export default func;
func.tags = ["trustRemote"];
