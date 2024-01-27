// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TestUSDC is ERC20 {
    constructor(address receiver) ERC20("Test USDC", "TUSDC") {
        _mint(receiver, 90000000000000000000000000000000000000000);
    }
}