async function main() {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();
    console.log("CoinFlip deployed to:", coinFlip.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });