import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, lzEndpoint, ibToken } = await getNamedAccounts();

  if (hre.network.name !== "ftm") {
    console.log("Skipping deployment of OFT on non-fantom network");
    return;
  }

  await deploy("IBOFT", {
    from: deployer,
    args: [ibToken, lzEndpoint],
    log: true,
  });
};
export default func;
func.tags = ["OFT"];
