// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";
import {IPrepayment} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IPrepayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract LuckySpin is VRFConsumerBase, Ownable {
    bytes32 public sKeyHash = 0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c;
    uint64 public sAccId;
    uint32 public sCallbackGasLimit;
    uint256 public sMinAmount = 10_000_000_000; //100 shard

    IVRFCoordinator COORDINATOR;
    IERC20 public SHARD;
    struct OutCome {
        uint256 reward;
        uint256 ratio;
    }

    struct PlayerDetail {
        uint256 spinCount;
        uint256 winCount;
        uint256 spinAmount;
        uint256 balance;
    }

    struct RequestDetail {
        address owner;
        uint256 amount;
    }

    OutCome[] public sChance; // base ratio is 10,000 ex: sChance[0]= OutCome({reward: 0, ratio: 4000}) => 40% for 0x
    mapping(uint256 => RequestDetail) public sRequestIdToDetail;
    mapping(uint256 => uint256) public sRequestIdToResult;
    mapping(address => PlayerDetail) public sAccountDetail;

    error InvalidAccount();
    error InvalidTokenOwner();
    error InvalidShardAmount();
    error InsufficientBalance();

    event Spin(address account, uint256 requestId, uint256 amount);
    event SpinResult(address account, uint256 requestId, uint256 result);
    event ChanceSet(uint256 index, uint256 reward, uint256 ratio);
    event ConfigSet(bytes32 keyHash, uint64 accId, uint32 callbackGasLimit);

    constructor(address coordinator, address shard) VRFConsumerBase(coordinator) {
        COORDINATOR = IVRFCoordinator(coordinator);
        SHARD = IERC20(shard);
        initChance();
    }

    function initChance() internal {
        //0x: 40%
        sChance.push(OutCome(0, 4000));
        //0.5x: 6%
        sChance.push(OutCome(5000, 600));
        //1.25x: 4%
        sChance.push(OutCome(12500, 400));
        //1.5x: 24%
        sChance.push(OutCome(15000, 2400));
        //1.75x: 12%
        sChance.push(OutCome(17500, 1200));
        //2.5x: 6%
        sChance.push(OutCome(25000, 600));
        //3x: 6%
        sChance.push(OutCome(30000, 600));
        //6x: 2%
        sChance.push(OutCome(60000, 200));
    }

    function setContract(address shard) external onlyOwner {
        SHARD = IERC20(shard);
    }

    function setChance(uint256 index, uint256 reward, uint256 ratio) public onlyOwner {
        OutCome storage chance = sChance[index];
        chance.ratio = ratio;
        chance.reward = reward;
        emit ChanceSet(index, reward, ratio);
    }

    function setConfig(bytes32 keyHash, uint64 accId, uint32 callbackGasLimit) public onlyOwner {
        sKeyHash = keyHash;
        sAccId = accId;
        sCallbackGasLimit = callbackGasLimit;
        emit ConfigSet(keyHash, accId, callbackGasLimit);
    }

    // Receive remaining payment from requestRandomWordsPayment
    receive() external payable {}

    function spin(uint256 amount) public payable returns (uint256 requestId) {
        if (amount < sMinAmount) revert InvalidShardAmount();
        uint256 shardBalance = SHARD.balanceOf(msg.sender);
        uint256 approveAmount = SHARD.allowance(msg.sender, address(this));
        if (approveAmount < amount || shardBalance < amount) {
            revert InsufficientBalance();
        }
        SHARD.transferFrom(msg.sender, address(this), amount);

        uint256 id = COORDINATOR.requestRandomWords{value: msg.value}(
            sKeyHash,
            sCallbackGasLimit,
            1,
            msg.sender
        );
        sRequestIdToDetail[id] = RequestDetail({amount: amount, owner: msg.sender});
        sAccountDetail[msg.sender].spinCount += 1;
        sAccountDetail[msg.sender].spinAmount += amount;
        emit Spin(msg.sender, id, amount);
        return id;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        RequestDetail memory request = sRequestIdToDetail[requestId];
        uint256 randomWord = (randomWords[0] % 10000) + 1;
        uint256 chanceNumber;
        uint256 winAmount;
        for (uint256 i = 0; i < sChance.length; i++) {
            OutCome memory chance = sChance[i];
            chanceNumber += chance.ratio;
            if (randomWord <= chanceNumber) {
                winAmount = (chance.reward * request.amount) / 10000;
                break;
            }
        }
        sAccountDetail[request.owner].balance += winAmount;
        bool isWin = winAmount > request.amount;
        if (isWin) sAccountDetail[request.owner].winCount += 1;
        sRequestIdToResult[requestId] = randomWord;
        emit SpinResult(request.owner, requestId, randomWord);
    }

    function cancelRequest(uint256 requestId) external onlyOwner {
        COORDINATOR.cancelRequest(requestId);
    }

    function withdrawTemporary(uint64 accId) external onlyOwner {
        address prepaymentAddress = COORDINATOR.getPrepaymentAddress();
        IPrepayment(prepaymentAddress).withdrawTemporary(accId, payable(msg.sender));
    }

    function claim() external {
        PlayerDetail storage player = sAccountDetail[msg.sender];
        uint256 amount = player.balance;
        if (amount <= 0 || SHARD.balanceOf(address(this)) < amount) revert InsufficientBalance();
        player.balance = 0;
        SHARD.transferFrom(address(this), msg.sender, amount);
    }
}
