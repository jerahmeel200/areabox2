// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Escrow is ReentrancyGuard {
    address payable seller;
    address payable buyer;
    address payable feeAddress;

    uint256 public contractBalance;
    uint256 public sellerBalance;
    uint256 public buyerBalance;

    uint256 public securityDeposit;
    uint256 public sellerPreAgreementAmount;
    uint256 public buyerPreAgreementAmount;

    uint256 transferFee;
    uint256 fee;

    event FundsDeposited(address indexed depositor, uint256 amount);

    event Deposit(
        address indexed contractAddress,
        address indexed from,
        uint amount
    );

    using SafeMath for uint256;

    constructor(
        address payable _seller,
        address payable _buyer,
        uint256 _securityDeposit,
        uint256 _sellerPreAgreementAmount,
        uint256 _buyerPreAgreementAmount,
        address _feeAddress
    ) {
        seller = _seller;
        buyer = _buyer;
        securityDeposit = _securityDeposit;
        sellerPreAgreementAmount = _sellerPreAgreementAmount;
        buyerPreAgreementAmount = _buyerPreAgreementAmount;
        transferFee = 1;
        feeAddress = payable(_feeAddress);
    }

    fallback() external payable {
        emit Deposit(address(this), msg.sender, msg.value);
    }

    receive() external payable {
        emit Deposit(address(this), msg.sender, msg.value);
    }

    function deposit(address _user) external payable {
        require(
            _user == seller || _user == buyer,
            "Only the seller or buyer can deposit funds"
        );
        if (_user == seller) {
            sellerBalance += msg.value;
        } else {
            buyerBalance += msg.value;
        }
        contractBalance += msg.value;
        emit FundsDeposited(_user, msg.value);
    }

    function withdraw(address _user) external payable nonReentrant {
        require(address(this).balance != 0, "Contract don't have funds");
        fee = address(this).balance.mul(transferFee).div(100);
        if (sellerBalance > sellerPreAgreementAmount) {
            require(seller == _user, "You are not the seller");
            seller.transfer(address(this).balance.sub(fee));
            feeAddress.transfer(fee);
        } else if (buyerBalance > securityDeposit) {
            require(buyer == _user, "You are not the buyer");
            buyer.transfer(address(this).balance.sub(fee));
            feeAddress.transfer(fee);
        }
        // neither buyer nor seller deposited the pre-agreement
        else if (
            address(this).balance != 0 &&
            sellerBalance < sellerPreAgreementAmount &&
            buyerBalance < buyerPreAgreementAmount
        ) {
            require(
                _user == buyer || _user == seller,
                "Just buyer or seller can withdraw"
            );
            if (_user == buyer && buyerBalance != 0) {
                fee = buyerBalance.mul(transferFee).div(100);
                buyer.transfer(buyerBalance.sub(fee));
                feeAddress.transfer(fee);
                buyerBalance = 0;
            } else if (_user == seller && sellerBalance != 0) {
                fee = sellerBalance.mul(transferFee).div(100);
                seller.transfer(sellerBalance.sub(fee));
                feeAddress.transfer(fee);
                sellerBalance = 0;
            }
        }
    }

    function returnSeller() public view returns (address) {
        return seller;
    }

    function returnBuyer() public view returns (address) {
        return buyer;
    }

    function returnSellerBalance() public view returns (uint) {
        return sellerBalance;
    }

    function returnBuyerBalance() public view returns (uint) {
        return buyerBalance;
    }

    function returnSecurityDeposit() public view returns (uint) {
        return securityDeposit;
    }

    function returnSellerPreAgreementAmount() public view returns (uint) {
        return sellerPreAgreementAmount;
    }

    function returnBuyerPreAgreementAmount() public view returns (uint) {
        return buyerPreAgreementAmount;
    }
}
