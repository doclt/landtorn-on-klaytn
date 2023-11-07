// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SHARDTEST is ERC20, ERC20Burnable, Pausable, Ownable {
    uint8 private constant DECIMALS = 8;
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10 ** DECIMALS;

    constructor() ERC20("SHARD", "SHARD") {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() < MAX_SUPPLY, "Can't exceed max supply");
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return DECIMALS;
    }
}
