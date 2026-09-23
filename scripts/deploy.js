import hre from "hardhat";

async function main() {
    console.log("Zapocinjem deployment DIDRegistry ugovora...");

    const DIDRegistry = await hre.ethers.getContractFactory("DIDRegistry");
    const registry = await DIDRegistry.deploy();

    await registry.waitForDeployment();

    const address = await registry.getAddress();
    console.log("----------------------------------------");
    console.log(`DIDRegistry ugovor je uspesno postavljen na adresu: ${address}`);
    console.log("----------------------------------------");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});