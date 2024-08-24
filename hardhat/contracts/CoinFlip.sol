// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flipCoin(bool guess) external payable returns (bool) {
        require(msg.value > 0, "Bet amount must be greater than zero");

        bool result = (block.timestamp % 2 == 0);
        if (result == guess) {
            payable(msg.sender).transfer(msg.value * 2);
            return true;
        } else {
            return false;
        }
    }
}