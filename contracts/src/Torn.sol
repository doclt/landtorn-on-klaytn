// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Torn is ERC721, ERC721Enumerable, ERC721Burnable, Ownable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant PALADIN_MAX_SUPPLY = 1000;
    uint256 public constant IRONFIST_MAX_SUPPLY = 1000;
    uint256 public constant LANDTORN = 1;
    uint256 public constant PALADIN = 2;
    uint256 public constant IRONFIST = 3;

    uint256 public totalLandTorn;
    uint256 public totalPaladin;
    uint256 public totalIronFist;

    string private _baseUrl = "https://api.landtorn.com/api/metadata/";

    event BaseUrlSet(string oldUrl, string newUrl);
    event TokenMinted(address owner, uint256 tokenId, uint256 tokenType);

    constructor() ERC721("Torn", "TRN") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUrl;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        string memory oldUrl = _baseUrl;
        _baseUrl = newURI;
        emit BaseUrlSet(oldUrl, newURI);
    }

    function safeMint() public {
        safeMint(LANDTORN, msg.sender);
        totalLandTorn += 1;
    }

    function mintPaladin(address to) public onlyRole(MINTER_ROLE) {
        safeMint(PALADIN, to);
        totalPaladin += 1;
    }

    function mintIronFist(address to) public onlyRole(MINTER_ROLE) {
        safeMint(IRONFIST, to);
        totalIronFist += 1;
    }

    function safeMint(uint256 tokenType, address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit TokenMinted(to, tokenId, tokenType);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(AccessControl, ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
