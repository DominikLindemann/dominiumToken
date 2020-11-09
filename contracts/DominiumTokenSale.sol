pragma solidity >=0.5.0;

import "./DominiumToken.sol";

contract DominiumTokenSale {
    address payable admin;
    DominiumToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;
    uint256 public tokensAvailable;

    event Sell(address _buyer, uint256 _amount);
    event EndSale(uint256 _totalAmountSold);

    constructor(DominiumToken _tokenContract, uint256 _tokenPrice, uint256 _tokensAvailable) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        tokensAvailable = _tokensAvailable;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice), 'msg.value must equal number of tokens in wei');
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens, 'cannot purchase more tokens than available');
        require(tokenContract.transfer(msg.sender, _numberOfTokens), 'Unable to send tokens');
        // emit Balance(address(this), _numberOfTokens);

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        // require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        admin.transfer(address(this).balance);

        emit EndSale(tokensSold);
    }
}