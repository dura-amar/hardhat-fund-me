const { network } = require("hardhat")
const {
    developmentChain,
    DECIMALS,
    INITAL_ANSWER,
    developmentChains,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITAL_ANSWER],
        })
        log("Mocks deployed!")
        log("_-------------------------------_")
    }
}

module.exports.tags = ["all", "mocks"]
