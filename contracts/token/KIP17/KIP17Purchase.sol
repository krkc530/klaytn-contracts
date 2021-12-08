pragma solidity ^0.5.0;

import "./KIP17Token.sol";
import "../../ownership/Ownable.sol";

/**
 * @title KIP17Purchase
 * @dev KIP17 purchase logic.
 */
contract KIP17Purchase is Ownable {
    // Optional mapping for tokens
    mapping(address => mapping(uint256 => uint256)) private _tokenPrice;
    mapping(address => mapping(uint256 => uint256)) private _tokenLaunchTime;

    constructor () public {
        // solhint-disable-previous-line no-empty-blocks
    }

    /**
     * @dev Returns the price for a given token ID of the contract.
     * Reverts if the token ID does not exist or the token owner is not this contract.
     * @param contractAddress address contract of the token to query
     * @param tokenId uint256 ID of the token to query
     * @return uint256 representing the token price
     */
    function tokenPrice(address contractAddress, uint256 tokenId) external view returns (uint256) {
        KIP17Token tokenContract = KIP17Token(contractAddress);
        require(tokenContract.ownerOf(tokenId) == address(this),
            "KIP17Purchase: contract is not owner"
        );

        return _tokenPrice[contractAddress][tokenId];
    }

    /**
     * @dev External function to set the token price for a given token of the contract.
     * Reverts if the token ID does not exist or the token owner is not this contract.
     * @param contractAddress address contract of the token to set its price
     * @param tokenId uint256 ID of the token to set its price
     * @param price uin256 price to assign
     */
    function setTokenPrice(address contractAddress, uint256 tokenId, uint256 price) external onlyOwner {
        KIP17Token tokenContract = KIP17Token(contractAddress);
        require(tokenContract.ownerOf(tokenId) == address(this), 
            "KIP17Purchase: contract is not owner"
        );

        _tokenPrice[contractAddress][tokenId] = price;
    }

    /**
     * @dev Returns the launch time for a given token ID of the contract.
     * Reverts if the token ID does not exist or the token owner is not this contract.
     * @param contractAddress address contract of the token to query
     * @param tokenId uint256 ID of the token to query
     * @return uint256 representing the token launch time
     */
    function tokenLaunchTime(address contractAddress, uint256 tokenId) external view returns (uint256) {
        KIP17Token tokenContract = KIP17Token(contractAddress);
        require(tokenContract.ownerOf(tokenId) == address(this), 
            "KIP17Purchase: contract is not owner"
        );

        return _tokenLaunchTime[contractAddress][tokenId];
    }

    /**
     * @dev External function to set the token launch time for a given token of the contract.
     * Reverts if the token ID does not exist or the token owner is not this contract.
     * @param contractAddress address contract of the token to query
     * @param tokenId uint256 ID of the token to set its launch time
     * @param launchTime uin256 launch time to assign
     */
    function setTokenLaunchTime(address contractAddress, uint256 tokenId, uint256 launchTime) external onlyOwner {
        KIP17Token tokenContract = KIP17Token(contractAddress);
        require(tokenContract.ownerOf(tokenId) == address(this), 
            "KIP17Purchase: contract is not owner"
        );

        _tokenLaunchTime[contractAddress][tokenId] = launchTime;
    }

    /**
     * @dev Function to purchase a given token of the contract.
     * Reverts if the token is not launched yet or msg.value does not match the price
     * @param contractAddress address contract of the token to purchase
     * @param tokenId The token id to be transferred.
     * @return A boolean that indicates if the operation was successful.
     */
    function purchase(address contractAddress, uint256 tokenId) public payable returns (bool) {
        KIP17Token tokenContract = KIP17Token(contractAddress);
        require(tokenContract.ownerOf(tokenId) == address(this),
            "KIP17Purchase: contract is not owner"
        );

        require(_tokenLaunchTime[contractAddress][tokenId] != 0 && // needed?
            _tokenPrice[contractAddress][tokenId] != 0, 
            "KIP17Purchase: token is not launched"
        );

        require(now >= _tokenLaunchTime[contractAddress][tokenId], 
            "KIP17Purchase: token is not launched"
        );

        require(msg.value == _tokenPrice[contractAddress][tokenId], 
            "KIP17Purchase: msg.value does not match the token price"
        );

        tokenContract.transferFrom(address(this), msg.sender, tokenId);
        owner().transfer(msg.value);
        _clearInfo(contractAddress, tokenId);
        return true;
    }
    
    /**
     * @dev Private function to clear mappings for a token.
     * @param contractAddress address contract of the token
     * @param tokenId uint256 ID of the token to clear its mappings
     */
    function _clearInfo(address contractAddress, uint256 tokenId) private {
        // Clear mappings for a token
        if (_tokenPrice[contractAddress][tokenId] != 0) {
            delete _tokenPrice[contractAddress][tokenId];
        }
        if (_tokenLaunchTime[contractAddress][tokenId] != 0) {
            delete _tokenLaunchTime[contractAddress][tokenId];
        }
    }
}