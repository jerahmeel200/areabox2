// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RequestMoney is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    enum RequestStatus { Pending, Approved, Rejected }

    struct MoneyRequest {
        address recipient;
        uint256 amount;
        uint256 expirationTime;
        RequestStatus status;
        mapping(address => bool) approvals;
    }

    mapping(uint256 => MoneyRequest) public requests;

    uint256 public requestCount;

    event MoneyRequested(uint256 indexed requestId, address indexed requester, address indexed recipient, uint256 amount, uint256 expirationTime);
    event RequestApproved(uint256 indexed requestId, address indexed approver);
    event RequestRejected(uint256 indexed requestId, address indexed rejecter);

    modifier validRequest(uint256 requestId) {
        require(requestId > 0 && requestId <= requestCount, "Invalid request ID");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {}

    function requestMoney(address recipient, uint256 amount, uint256 durationInMinutes) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(recipient != address(0), "Invalid recipient address");
        require(address(this).balance >= amount, "Insufficient funds");

        uint256 expirationTime = block.timestamp.add(durationInMinutes.mul(1 minutes));
        requestCount++;

        MoneyRequest storage request = requests[requestCount];
        request.recipient = recipient;
        request.amount = amount;
        request.expirationTime = expirationTime;
        request.status = RequestStatus.Pending;

        emit MoneyRequested(requestCount, msg.sender, recipient, amount, expirationTime);
    }

    function approveRequest(uint256 requestId) external nonReentrant validRequest(requestId) {
        MoneyRequest storage request = requests[requestId];
        require(request.status == RequestStatus.Pending, "Request is not pending");
        require(block.timestamp <= request.expirationTime, "Request has expired");
        require(!request.approvals[msg.sender], "Already approved by this address");

        request.approvals[msg.sender] = true;

        if (countApprovals(request) >= 2) {
            request.status = RequestStatus.Approved;
            emit RequestApproved(requestId, msg.sender);
        }
    }

    function rejectRequest(uint256 requestId) external onlyOwner nonReentrant validRequest(requestId) {
        MoneyRequest storage request = requests[requestId];
        require(request.status == RequestStatus.Pending, "Request is not pending");
        require(block.timestamp <= request.expirationTime, "Request has expired");

        request.status = RequestStatus.Rejected;
        emit RequestRejected(requestId, msg.sender);
    }

    function countApprovals(MoneyRequest storage request) internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < requestCount; i++) {
            if (request.approvals[requests[i].recipient]) {
                count++;
            }
        }
        return count;
    }

    receive() external payable {}
}
