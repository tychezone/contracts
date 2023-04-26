pragma solidity = 0.5.16;

import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract Token1 is ERC20Detailed, ERC20, Ownable {
    constructor() ERC20Detailed('Token1', 'TK1', 18) public{}
    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }
}