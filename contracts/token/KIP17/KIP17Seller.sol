pragma solidity ^0.5.0;

import "./KIP17Token.sol";
import "../../ownership/Ownable.sol";

/**
 * @title KIP17Seller
 * @dev KIP17 purchase logic.
 */
contract KIP17Seller is Ownable {
    KIP17Token private _kip17Token;
    uint256[] private _tokenList;
    bool private _onSale = false;
    uint256 private _remainAmount;
    uint256 private _maxAmountPerTx;

    // Optional mapping for tokens
    uint256 private _tokenPrice;
    uint256 private _tokenLaunchTime;

    constructor (address kip17TokenAddress) public {
        _kip17Token = KIP17Token(kip17TokenAddress);
    }

    function startOnSale(
        uint256[] calldata tokenList,
        uint256 price, 
        uint256 time,
        uint256 maxAmountPerTx
        ) external onlyOwner returns (bool) {
        require(!_onSale,
            "KIP17Seller: On sale"
        );
        _tokenList = tokenList;
        _remainAmount = _tokenList.length;
        _tokenPrice = price;
        _tokenLaunchTime = time;
        _maxAmountPerTx = maxAmountPerTx;
        _onSale = true;

        return true;
    }

    function stopSale() external onlyOwner returns (bool) {
        require(_onSale,
            "KIP17Seller: Not on sale"
        );
        _onSale = false;

        return true;
    }

    function resumeSale() external onlyOwner returns (bool) {
        require(!_onSale,
            "KIP17Seller: On sale"
        );
        _onSale = true;

        return true;
    }

    function finishSale() external onlyOwner returns (bool) {
        require(!_onSale,
            "KIP17Seller: On sale"
        );
        for (uint256 i=0; i<_tokenList.length; i++) {
            // send remain tokens to owner
            _kip17Token.transferFrom(address(this), owner(), _tokenList[i]);
        }

        return true;
    }

    function purchase(uint256 amount) external payable returns (bool) {
        require(_onSale,
            "KIP17Seller: Not on sale"
        );

        require(now >= _tokenLaunchTime, 
            "KIP17Seller: Not launched yet"
        );

        require(amount <=  _maxAmountPerTx,
            "KIP17Seller: Exceeds max amount for tx"
        );

        require(msg.value == _tokenPrice * amount, 
            "KIP17Seller: Invalid msg.value or amount"
        );

        require(_tokenList.length > 0,
            "KIP17Seller: Sold out"
        );

        uint256 _amount = amount;
        if (amount > _tokenList.length) {
            _amount = _tokenList.length;
        }
        uint256 _pays = _amount * _tokenPrice;
        uint256 _refunds = msg.value - _pays;

        for (uint256 i=0; i<_amount; i++) {
            uint256 _tokenId = _tokenList[_tokenList.length - 1];
            _tokenList.length--;
            _kip17Token.transferFrom(address(this), msg.sender, _tokenId);
        }
        
        owner().transfer(_pays);
        if (_refunds > 0) {
            msg.sender.transfer(_refunds);
        }

        return true;
    }
}