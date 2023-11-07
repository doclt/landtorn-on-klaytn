import { ethers, hardhatArguments } from "hardhat";
import { initConfig, setConfig, updateConfig } from "./ultil";

async function main() {
  await initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";

  const account = await ethers.deployContract("Account");

  await account.waitForDeployment();

  console.log(`account with address: ${await account.getAddress()}`);
  setConfig(`${network}.account`, await account.getAddress());
  await updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
