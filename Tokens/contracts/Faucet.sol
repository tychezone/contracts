pragma solidity ^0.5.1;

interface ERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet {
    mapping(address => uint256) public tokenAmounts;
    uint256 constant public waitTime = 30 minutes;

    address public owner;
    mapping(address => mapping(address => uint256)) lastAccessTime;
    mapping(address => uint256) public tokenWaitTimes;

    constructor() public {
        owner = msg.sender;
    }

    function requestTokens(address _tokenInstance) public {
        require(_tokenInstance != address(0), "Invalid token address");
        uint256 remainingTimeInSeconds = lastAccessTime[msg.sender][_tokenInstance] - block.timestamp;
        require(allowedToWithdraw(msg.sender, _tokenInstance), string(abi.encodePacked("You must wait ", uint2str(remainingTimeInSeconds), " seconds before requesting tokens again.")));
        ERC20 token = ERC20(_tokenInstance);
        token.transfer(msg.sender, tokenAmounts[_tokenInstance]);
        lastAccessTime[msg.sender][_tokenInstance] = block.timestamp + tokenWaitTimes[_tokenInstance];
    }

    function updateTokenAmount(address _tokenInstance, uint256 _newAmount) public onlyOwner {
        require(_tokenInstance != address(0));
        tokenAmounts[_tokenInstance] = _newAmount;
    }

    function allowedToWithdraw(address _address, address _token) public view returns (bool) {
        if(lastAccessTime[_address][_token] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address][_token]) {
            return true;
        }
        return false;
    }

    function setTokenWaitTime(address _tokenInstance, uint256 _waitTime) public onlyOwner {
        require(_tokenInstance != address(0), "Invalid token address");
        tokenWaitTimes[_tokenInstance] = _waitTime;
    }

    function withdrawTokens(address[] memory _tokenAddresses) public {
        for (uint i = 0; i < _tokenAddresses.length; i++) {
            ERC20 token = ERC20(_tokenAddresses[i]);
            uint balance = token.balanceOf(address(this));
            require(balance > 0, "Token balance is zero");
            require(token.transfer(msg.sender, balance), "Token transfer failed");
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}