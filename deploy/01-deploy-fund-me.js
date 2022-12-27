//import
//main function
//call main function

const { network } = require("hardhat")

// function deployFunc(){
//     console.log("hi")
// }

// module.exports.default = deployFunc

//syntatic sugar

const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const { verify } = require("../utils/verify")

    // when going for localhost or hardhat we use mock

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAddregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAddregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("---------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
