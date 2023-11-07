// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "tokenbound/interfaces/IERC6551Account.sol";

import "./interfaces/ITorn.sol";

contract ClaimerV2 is IERC721Receiver, Ownable {
    uint256 private fee = 30 * 10 ** 12; //0.00003
    ITorn public torn;
    uint256 public currentGameId = 1;
    //gas fee by amount of energy
    mapping(uint256 => uint256) gasFeeToEnergy;

    error InsufficientBalance();
    error NotOwnedToken();
    error NotApproved();
    error TokenNotExisted();
    error InvalidEnergy();

    event Participated(
        address account,
        uint256 tokenId,
        address owner,
        uint256 gameType,
        uint256 gameId,
        uint256 energy
    );
    event GasFeeSet(uint256 newFee, uint256 oldFee);
    event TokenContractSet(address torn);

    receive() external payable {}

    constructor(ITorn _torn) {
        torn = _torn;
        initGasFee();
    }

    function initGasFee() internal {
        gasFeeToEnergy[1] = 37 * 10 ** 12; //0.000037
        gasFeeToEnergy[2] = 45 * 10 ** 12; //0.000045
        gasFeeToEnergy[5] = 53 * 10 ** 12; //0.000053
        gasFeeToEnergy[10] = 82 * 10 ** 12; //0.000082
        gasFeeToEnergy[20] = 130 * 10 ** 12; //0.00013
    }

    function gasFee(uint256 _energy) public view returns (uint256) {
        uint256 gas = gasFeeToEnergy[_energy];
        if (gas == 0) revert InvalidEnergy();
        return gas + fee;
    }

    function setTokenContract(ITorn _torn) public onlyOwner {
        torn = _torn;
        emit TokenContractSet(address(_torn));
    }

    function setFee(uint256 _newFee) public onlyOwner {
        uint256 oldFee = fee;
        fee = _newFee;
        emit GasFeeSet(_newFee, oldFee);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function participate(address _account, uint256 _type, uint256 _energy) public payable {
        uint256 totalFee = gasFee(_energy);
        if (msg.value < totalFee) revert InsufficientBalance();
        (, , uint256 tokenId) = IERC6551Account(payable(_account)).token();
        //check owner
        if (torn.ownerOf(tokenId) != msg.sender) revert NotOwnedToken();
        emit Participated(_account, tokenId, msg.sender, _type, currentGameId, _energy);
        currentGameId += 1;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
