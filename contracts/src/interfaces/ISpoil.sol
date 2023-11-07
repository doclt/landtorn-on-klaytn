// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC1155.sol";

interface ISpoil is IERC1155 {
    function mint(address account, uint256 id, uint256 amount, bytes memory data) external;

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;
}
