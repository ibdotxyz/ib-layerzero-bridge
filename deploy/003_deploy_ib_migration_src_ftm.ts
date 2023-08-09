import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer, lzEndpoint, ibToken } = await getNamedAccounts();

  const newIBToken = await (await get("IBOFT")).address;

  if (hre.network.name !== "ftm") {
    console.log("Skipping deployment of IBMigrationSrc on non-fantom network");
    return;
  }

  await deploy("IBMigrationSrc", {
    from: deployer,
    args: [ibToken, newIBToken, lzEndpoint],
    log: true,
  });
};
export default func;
func.tags = ["IBMigrationSrc"];
