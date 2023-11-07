// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC721.sol";

interface ITorn is IERC721 {
    function safeMint() external;

    function burn(uint256 tokenId) external;
}
