//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        //Address 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        //ABI
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate(
        uint256 _ethAmount, AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 _ethPrice = getPrice(priceFeed);
        uint256 _ethAmountInUsd = (_ethPrice * _ethAmount) / 1e18;
        return _ethAmountInUsd;
    }
}
