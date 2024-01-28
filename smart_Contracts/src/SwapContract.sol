// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./SwapContract.sol";

contract SwapContract {
    address public owner;
    IUniswapV2Router02 public uniswapRouter;
    address public feeReceiver; // address to receive the 0.05% protocol fee

    event SwappedTokens(address indexed user, uint256 amountIn, uint256 amountOut);

    constructor(address _uniswapRouter, address _feeReceiver,  address _swapContract) {
        owner = msg.sender;
        uniswapRouter = IUniswapV2Router02(_uniswapRouter);
        feeReceiver = _feeReceiver;
        swapContract = _swapContract;
    }

    function swapWithPermit(
        // ... parameters for the permit function ...
        address fromToken,
        address toToken,
        uint256 amount,
        uint256 nonce,
        uint256 expiry,
        bool allowed,
        uint8 v,
        bytes32 r,
        bytes32 s,
        // ... parameters for the Uniswap swap ...
        uint256 amountOutMin,
        address[] calldata path,
        uint256 deadline
    ) external {
        // Call permit function of fromToken
        IERC20(fromToken).permit(msg.sender, address(this), nonce, expiry, allowed, v, r, s);
        
        // Transfer tokens to this contract
        IERC20(fromToken).transferFrom(msg.sender, address(this), amount);

        // Make the swap on Uniswap
        uint256 amountOut = uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amount,
            amountOutMin,
            path,
            address(this),
            deadline
        )[path.length - 1];

        // Calculate fees
        uint256 executionReward = (amountOut * 20) / 10000;  // 0.20%
        uint256 protocolFee = (amountOut * 5) / 10000;      // 0.05%
        
        // Transfer fees
        IERC20(toToken).transfer(msg.sender, executionReward);  // Reward to the one who executed the transaction
        IERC20(toToken).transfer(feeReceiver, protocolFee);     // Protocol fee

        // Transfer remaining tokens to the signer
        uint256 remaining = amountOut - executionReward - protocolFee;
        address signer = ecrecover(/* ...params to get the signer... */);
        require(signer != address(0), "Invalid signer");
        IERC20(toToken).transfer(signer, remaining);

        emit SwappedTokens(signer, amount, amountOut);
    }
}