import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, ibToken, lzEndpoint } = await getNamedAccounts();

  if (hre.network.name !== "op") {
    console.log("Skipping deployment of ProxyOFT on non-optimism network");
    return;
  }

  await deploy("IBProxyOFT", {
    from: deployer,
    args: [lzEndpoint, ibToken],
    log: true,
  });
};
export default func;
func.tags = ["ProxyOFT"];
