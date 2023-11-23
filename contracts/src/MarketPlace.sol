// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "tokenbound/interfaces/IERC6551Account.sol";
import "tokenbound/interfaces/IERC6551Registry.sol";

import "./interfaces/ISpoil.sol";
import "./interfaces/ITorn.sol";

contract Marketplace is Ownable {
    IERC20 public shard;
    ISpoil public spoil;
    ISpoil public mythic;
    ITorn public torn;

    IERC6551Registry private registry;
    address private implementation;

    uint256[] baronSpoilRewards;
    uint256[] baronMythicRewards;

    struct Item {
        uint256 itemId;
        uint256 price;
        uint256 itemType;
    }

    mapping(uint256 => Item) public itemInShard;
    mapping(uint256 => Item) public itemInEth;

    error InsufficientBalance();
    error InvalidItem();
    error AccountNotSupport();

    event ItemBought(
        uint256 id,
        uint256 itemId,
        address recipient,
        uint256 amount,
        uint256 itemType,
        address sender
    );
    event ItemInShardSet(uint256 item, uint256 itemId, uint256 shardPrice, uint256 itemType);
    event ItemInEthSet(uint256 item, uint256 itemId, uint256 ethPrice, uint256 itemType);
    event TokenSet(address shard, address spoil);
    event BaronRewardSet(uint256[] spoilIds, uint256[] mythicIds);

    receive() external payable {}

    constructor(address _shardToken, address _spoil, address _mythic, address _torn) {
        shard = IERC20(_shardToken);
        spoil = ISpoil(_spoil);
        mythic = ISpoil(_mythic);
        torn = ITorn(_torn);
    }

    function setRegistryAndImplementation(
        IERC6551Registry _registry,
        address _implementation
    ) public onlyOwner {
        registry = _registry;
        implementation = _implementation;
    }

    function setBaronReward(
        uint256[] memory _spoilIds,
        uint256[] memory _mythicIds
    ) public onlyOwner {
        baronSpoilRewards = _spoilIds;
        baronMythicRewards = _mythicIds;
        emit BaronRewardSet(baronSpoilRewards, baronMythicRewards);
    }

    function setItemInShard(
        uint256 _id,
        uint256 _itemId,
        uint256 _shardPrice,
        uint256 _itemType
    ) public onlyOwner {
        itemInShard[_id] = Item(_itemId, _shardPrice, _itemType);
        emit ItemInShardSet(_id, _itemId, _shardPrice, _itemType);
    }

    function setItemInEth(
        uint256 _id,
        uint256 _itemId,
        uint256 _ethPrice,
        uint256 _itemType
    ) public onlyOwner {
        itemInEth[_id] = Item(_itemId, _ethPrice, _itemType);
        emit ItemInEthSet(_id, _itemId, _ethPrice, _itemType);
    }

    function buyByShard(uint256 _id, address _recipient, uint256 _amount) public {
        checkAccount(_recipient);
        Item memory item = itemInShard[_id];
        uint256 price = item.price;
        if (price == 0) revert InvalidItem();
        uint256 approveAmount = shard.allowance(msg.sender, address(this));
        if (approveAmount < price * _amount) {
            revert InsufficientBalance();
        }
        shard.transferFrom(msg.sender, address(this), price * _amount);
        if (item.itemType == 2)
            //spoil mint
            spoil.mint(_recipient, item.itemId, _amount, "0x");
        if (item.itemType == 3)
            //mythic mint
            mythic.mint(_recipient, item.itemId, _amount, "0x");
        emit ItemBought(_id, item.itemId, _recipient, _amount, item.itemType, msg.sender);
    }

    function setToken(address _shardToken, address _spoil) public onlyOwner {
        shard = IERC20(_shardToken);
        spoil = ISpoil(_spoil);
        emit TokenSet(_shardToken, _spoil);
    }

    function buyByEth(uint256 _id, address _recipient, uint256 _amount) public payable {
        checkAccount(_recipient);
        Item memory item = itemInEth[_id];
        uint256 price = item.price;
        if (price == 0) revert InvalidItem();
        if (msg.value < price * _amount) {
            revert InsufficientBalance();
        }
        if (item.itemType == 1) {
            //mint baron
            uint256[] memory spoilAmounts = new uint256[](baronSpoilRewards.length);
            for (uint i = 0; i < baronSpoilRewards.length; i++) {
                spoilAmounts[i] = 1;
            }
            spoil.mintBatch(_recipient, baronSpoilRewards, spoilAmounts, "0x");
            //mint mythic
            uint256[] memory mythicAmounts = new uint256[](baronMythicRewards.length);
            for (uint i = 0; i < baronMythicRewards.length; i++) {
                mythicAmounts[i] = 1;
            }
            mythic.mintBatch(_recipient, baronMythicRewards, mythicAmounts, "0x");
        } else if (item.itemType == 2) {
            //spoil mint
            spoil.mint(_recipient, item.itemId, _amount, "0x");
        } else if (item.itemType == 3) {
            //mythic mint
            mythic.mint(_recipient, item.itemId, _amount, "0x");
        }
        emit ItemBought(_id, item.itemId, _recipient, _amount, item.itemType, msg.sender);
    }

    function checkAccount(address _account) internal view {
        (, , uint256 tokenId) = IERC6551Account(payable(_account)).token();
        //check implementation account
        address accountAddress = registry.account(
            implementation,
            block.chainid,
            address(torn),
            tokenId,
            0
        );
        if (accountAddress != _account) {
            revert AccountNotSupport();
        }
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawShard() public onlyOwner {
        shard.transfer(msg.sender, shard.balanceOf(address(this)));
    }
}
