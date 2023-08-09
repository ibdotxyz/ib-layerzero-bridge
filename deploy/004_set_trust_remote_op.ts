import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { solidityPack } = ethers.utils;

  const { deployer } = await getNamedAccounts();

  const ftmChainId = 112; // LayerZero chainId
  const ibOFTAddress = "0xc358D3Ea954e39cAeABc9c2fD80DCE21A920387b";

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
