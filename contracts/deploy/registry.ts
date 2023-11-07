import { ethers, hardhatArguments } from "hardhat";
import { initConfig, setConfig, updateConfig } from "./ultil";

async function main() {
  await initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const registry = await ethers.deployContract("ERC6551Registry");

  await registry.waitForDeployment();
  console.log(`registry with address: ${await registry.getAddress()}`);
  setConfig(`${network}.Registry`, await registry.getAddress());
  await updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
