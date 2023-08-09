import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { solidityPack } = ethers.utils;

  const { deployer } = await getNamedAccounts();

  const opChainId = 111; // LayerZero chainId
  const ibProxyOFTAddress = "0x6fb612d5b817183845c6a5bB2D2aFB6E7cbA4Ee9";

  if (hre.network.name !== "ftm") {
    return;
  }

  await execute(
    "IBOFT",
    { from: deployer, log: true },
    "setTrustedRemoteAddress",
    opChainId,
    solidityPack(["address"], [ibProxyOFTAddress])
  );
};
export default func;
func.tags = ["trustRemote"];
