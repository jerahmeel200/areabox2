// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IEscrow.sol";

contract Escrow is IEscrow, Ownable, ReentrancyGuard {
    /**@dev Grouped variables of same type i.e address
        See IEscrow.Addresses
     */
    Addresses private addresses;

    ///@dev See IEscrow.Uint256s
    Uint256s private _uints;

    using SafeMath for uint256;

    modifier onlyBuyerOrSeller(address caller) {
        if(!((caller == seller) || (caller == buyer))) revert OnlySellerOrBuyer(caller);
        _;
    }

    constructor(
        address _seller,
        address _buyer,
        uint256 _securityDeposit,
        uint256 _sellerPreAgreementAmount,
        uint256 _buyerPreAgreementAmount,
        address _feeAddress
    ) {
        _uints = Uint256s(0, 0, 0, _securityDeposit, _sellerPreAgreementAmount, _buyerPreAgreementAmount, 1, 0);
        addresses = Addresses(_seller, _buyer, payable(_feeAddress));
    }

    fallback() external payable onlyBuyerOrSeller(_msgSender()) {
        emit Deposit(address(this), _msgSender(), msg.value);
    }

    receive() external payable onlyBuyerOrSeller(_msgSender()) {
        emit Deposit(address(this), _msgSender(), msg.value);
    }

    function deposit(address _user) external payable onlyOwner onlyBuyerOrSeller(_user) {
        uint256 inValue = msg.value;
        if (_user == seller) {
            _uints.sellerBalance += inValue; 
        } else {
            _uints.buyerBalance += inValue;
        }
        contractBalance += inValue;
        emit FundsDeposited(_user, inValue);
    }

    function _transferFund(
        address recipient,
        address feeTo,
        uint256 fee
    ) private {
        (bool feeSent,) = recipient.call{value: contractBal.sub(fee)}("");
        (bool done,) = feeTo.call{value: fee}("");
        require(feeSent && done, "Trxn failed");
    }

    // Wip
    function withdraw(address _user) external payable nonReentrant onlyOwner onlyBuyerOrSeller(_user) {
        uint256 contractBal = address(this).balance;
        Addresses _ad = addresses;
        Uint256s _ui = _uints;
        require(address(this).balance > 0, "Contract don't have funds");
        fee = contractBal.mul(_ui.transferFee).div(100);
        if (_ui.sellerBalance > _ui.sellerPreAgreementAmount) {
            require(seller == _user, "You are not the seller");
            _transferFund(_ad.seller, _ad.feeAddress, _ui.fee);
        } else if (_ui.buyerBalance > _ui.securityDeposit) {
            require(_ad.buyer == _user, "You are not the buyer");
            _transferFund(_ad.buyer, _ad.feeAddress, _ui.fee);
        }
        // neither buyer nor seller deposited the pre-agreement
        else if (
            contractBal > 0 &&
            _ad.sellerBalance < _ui.sellerPreAgreementAmount &&
            _ad.buyerBalance < _ui.buyerPreAgreementAmount
        ) {
            require(
                _user == _ad.buyer || _user == _ad.seller,
                "Just buyer or seller can withdraw"
            );
            if (_user == _ad.buyer && _ui.buyerBalance != 0) {
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
