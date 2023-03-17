// SPDX-License-Identifier: MIT

/**
____   ____________   ________    _____   
\   \ /   /\_____  \ /  _____/   /  _  \  
 \   Y   /   _(__  </   \  ___  /  /_\  \ 
  \     /   /       \    \_\  \/    |    \
   \___/   /______  /\______  /\____|__  /
                  \/        \/         \/ 

*/

pragma solidity ^0.8.15;

import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "./MutableOperatorFilterer.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract V3GA is MutableOperatorFilterer, ERC721A, ERC721AQueryable, ERC2981 {
    string private baseURI;
    address public ownerAddr = 0xdb275FaC4239aa53e3c56b7e999Dfc2B2406b671;

    // Total NFTs that can be minted
    uint256 public maxSupply = 2222;
    uint256 public mintPrice = 0.1 ether;
    bool public pausedMint = true;

    constructor(
        string memory name,
        string memory symbol,
        string memory initBaseURI,
        address operatorFilterRegistryAddress,
        address operatorFilterRegistrant
    )
        ERC721A(name, symbol)
        MutableOperatorFilterer(
            operatorFilterRegistryAddress,
            operatorFilterRegistrant
        )
    {
        setBaseURI(initBaseURI);
    }

    // Public mint
    function mint(uint256 num) external payable {
        uint256 supply = totalSupply();
        require(!pausedMint, "Minting is paused");
        require(supply + num < maxSupply, "Exceeds maximum NFTs supply");
        require(msg.value == mintPrice * num, "Ether sent is not correct");
        _safeMint(msg.sender, num);
    }

    function giveAway(address recipient, uint256 num) external onlyOwner {
        uint256 supply = totalSupply();
        require(supply + num < maxSupply, "Exceeds maximum NFTs supply");
        _safeMint(recipient, num);
    }

    function setMintPrice(uint256 priceInWei) external onlyOwner {
        mintPrice = priceInWei;
    }

    function paused(bool val) external onlyOwner {
        pausedMint = val;
    }

    function setMaxSupply(uint256 val) external onlyOwner {
        maxSupply = val;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Include trailing slash in uri
    function setBaseURI(string memory uri) public onlyOwner {
        baseURI = uri;
    }

    function withdrawAll() external payable onlyOwner {
        uint256 all = address(this).balance;
        require(payable(ownerAddr).send(all));
    }

    /********************
     *  OPERATOR FILTER
     ********************/

    function setApprovalForAll(
        address operator,
        bool approved
    ) public override(ERC721A, IERC721A) onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(
        address operator,
        uint256 tokenId
    )
        public
        payable
        override(ERC721A, IERC721A)
        onlyAllowedOperatorApproval(operator)
    {
        super.approve(operator, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A, IERC721A) onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable override(ERC721A, IERC721A) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public payable override(ERC721A, IERC721A) onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }

    /************
     *  IERC165
     ************/

    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * [EIP section](https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified)
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30000 gas.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A, IERC721A, ERC2981) returns (bool) {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    /*************
     *  IERC2981
     *************/

    /**
     * @notice Allows the owner to set default royalties following EIP-2981 royalty standard.
     * - `feeNumerator` defaults to basis points e.g. 500 is 5%
     */
    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }
}
