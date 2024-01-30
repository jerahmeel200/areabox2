// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IEscrow {
  error OnlySellerOrBuyer(address caller);
  event FundsDeposited(address indexed depositor, uint256 amount);

  event Deposit(
    address indexed contractAddress,
    address indexed from,
    uint amount
  );

  struct Addresses {
    address payable seller;
    address payable buyer;
    address payable feeAddress;
  }

  struct Uint256s {
    uint256 contractBalance;
    uint256 sellerBalance;
    uint256 buyerBalance;
    uint256 securityDeposit;
    uint256 sellerPreAgreementAmount;
    uint256 buyerPreAgreementAmount;
    uint256 transferFee;
    uint256 fee;
  }

}