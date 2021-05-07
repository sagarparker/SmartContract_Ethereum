// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;



contract InfyCoin{
    int balance;
    
    constructor(){
        balance = 0;
    }
    
    function getBalance() view public returns(int){
        return balance;
    }
    
    
    function depositBalance(int amt) public{
        balance = balance + amt;
    }
    
    
    function withdrawBalance(int amt) public{
        balance = balance - amt;
    }
}