// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <=0.8.0;

import "./IERC20.sol";

contract PaymentGateWay{
    
    address public owner;
    address payable public wallet;
    
    // address ether :0x0000000000000000000000000000000000000000

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);    // emits when ownership of gateway is changed
    event WalletChanged(address indexed previousWallet, address indexed newWallet);         // emits when wallet of gateway is changed
    event CoinTransferred(address indexed sender, address indexed receiver, uint value);    // emits when coins(not tokens) are transferred
    event TokenTransferred(address indexed sender, address indexed receiver, IERC20 currency, uint value); // emits when tokens are transferred
    
    function _msgSender() internal view returns (address) {                 // address of msg.sender
        return msg.sender;
    }

    function _msgValue() internal view returns (uint) {                     // amount of msg.value
        return msg.value;
    }

    constructor(address _wallet, address _owner) {
      require(!checkForSmartContract(_wallet),"Please use an External account");
      require(!checkForSmartContract(_owner),"Please use an External account");
      owner = _owner;                                                                          // set the owner of gateway
      wallet = payable(_wallet);                                                                        // set the wallet of gateway
    }

    modifier onlyOwner() {
      require(_msgSender() == owner, "You are not Owner");
      _;
    }
    
    function checkForSmartContract(address _address) internal view returns(bool) {             // checks an address / contract or EOA
        uint size;
        assembly{
            size:= extcodesize(_address)
        }
        if (size > 0){
            // this is a smart contract
            return true;
        }
        else return false;
    }

    function transferOwnership(address _newOwner) public onlyOwner {                           // transferring ownership of gateway
      require(_newOwner != address(0));
      require(owner != _newOwner,"Use new address");
      require(!checkForSmartContract(_newOwner),"Please use an External account. Not SmartContract!");
      emit OwnershipTransferred(owner, _newOwner);
      owner = _newOwner;
    }
    
    function changeWallet(address _newWallet) public onlyOwner {                       // change the wallet of gateway
        require(_newWallet != address(0));
        require(wallet != _newWallet,"Use new wallet");
        require(!checkForSmartContract(_newWallet),"Please use an External account. Not SmartContract!");
        emit WalletChanged(wallet,_newWallet);
        wallet = payable(_newWallet);
    }
    
    function transferTo(address _recipient, uint256 _value, IERC20 _currency) public onlyOwner {      // trasnfer currencies from gateway to any EAO
        require(!checkForSmartContract(_recipient),"Please use an External account. You cannot send your coins to other contracts");
        if (address(_currency) == address(0x0)) { 
            require(_value <= address(this).balance, "not enough balance");
            payable(_recipient).transfer(_value);
            emit CoinTransferred(wallet, _recipient, _value);
        } 
        else { // use Token
            require(checkForSmartContract(address(_currency)), "Invalid Contract address");
            require(_value <= _currency.balanceOf(address(this)), "not enough Token balance");
            require(_currency.transfer(_recipient, _value),  "token transfer failed failed");
            emit TokenTransferred(address(this), wallet , _currency, _value);                       // event for transfer to wallet
        }
    }
    
    function withdraw(uint256 _value, IERC20 _currency) public onlyOwner {                  // trasnfer currencies from gateway to wallet
        if (address(_currency) == address(0x0)) { 
            require(_value <= address(this).balance, "not enough balance");
            payable(wallet).transfer(_value);
            emit CoinTransferred(address(this), wallet, _value);
        } 
        else { // use Token
            require(checkForSmartContract(address(_currency)), "Invalid Contract address");
            require(_value <= _currency.balanceOf(address(this)), "not enough Token balance");
            require(_currency.transfer(wallet, _value),  "token transfer failed failed");
            emit TokenTransferred(address(this), wallet , _currency, _value);                        // event for transfer to wallet
        }
    }
    
    function deposit(uint _value, IERC20 _currency) public payable {                // costumers call this and transfer currency to gateway
        if (address(_currency) == address(0x0)) { 
            require(_msgValue() == _value, "Coin value doesn't match offer");
            emit CoinTransferred(_msgSender(), address(this), _value);
        } 
        else { // use Token
            require(checkForSmartContract(address(_currency)), "Invalid Contract address");
            require(_msgValue() == 0, "Coin would be lost");
            require(_currency.transferFrom(_msgSender(), address(this), _value),  "transferFrom failed");
            emit TokenTransferred(_msgSender(), address(this), _currency, _value); // event for transfer from to contract
        }
    }
     
    function buy(uint _value, IERC20 _currency) public payable {               // direct transfer from costumers to wallet
        if (address(_currency) == address(0x0)) { 
            require(_msgValue() == _value, "Coin value doesn't match offer");
            payable(wallet).transfer(_value);
            emit CoinTransferred(_msgSender(), address(this), _value);
        } 
        else { // use Token
            require(checkForSmartContract(address(_currency)), "Invalid Contract address");
            require(_msgValue() == 0, "Coin would be lost");
            require(_currency.transferFrom(_msgSender(), address(this), _value),  "transferFrom failed");
            require(_currency.transfer(wallet, _value),  "token transfer failed failed");
            emit TokenTransferred(address(this), wallet , _currency, _value); // event for transfer to wallet 
        }
    }
    
    function getBalance(IERC20 _currency) public view onlyOwner returns (uint balance) {       // balance of available currencies in gateway
        if (address(_currency) == address(0x0)) { 
            return address(this).balance;
        }
        else {
            require(checkForSmartContract(address(_currency)), "Invalid Contract address");
            return _currency.balanceOf(address(this));
        }
    }
}

contract CreateGateway{
    
    address private owner;
    
    modifier onlyOwner() {
      require(_msgSender() == owner, "You are not Owner");
      _;
    }
    
    function _msgSender() internal view returns (address) {
        return msg.sender;
    }
    
    event GateWayCreated(address gateWayAddress);               // emits when gateway is created
    
    constructor() {
      owner = _msgSender();
    }
    
    function createPaymentGate(address _wallet, address _owner) external onlyOwner {      // create new gateway
        require(!checkForSmartContract(_wallet),"Please use an External account");
        require(!checkForSmartContract(_owner),"Please use an External account");
        PaymentGateWay paymentGateWay = new PaymentGateWay(payable(_wallet), _owner);
        emit GateWayCreated(address(paymentGateWay));
    }
    
    function checkForSmartContract(address _address) internal view returns(bool) {
        uint size;
        assembly{
            size:= extcodesize(_address)
        }
        if (size > 0){
            // this is a smart contract
            return true;
        }
        else return false;
    }
}