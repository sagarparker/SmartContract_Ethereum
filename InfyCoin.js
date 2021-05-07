const express = require('express');

require('dotenv').config();

const app = express();

const Web3 = require('web3');

const InfyCoin = require('./build/contracts/InfyCoin.json');

const { networks } = require('./truffle-config');

let contract_address = process.env.contract_address;

let account_address = process.env.account_address;

const web3 = new Web3(networks.kovan.provider());
    
const contract = new web3.eth.Contract(InfyCoin.abi,contract_address);


//BODY PARSER PRESET

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.text({ limit: '200mb' }));


// const TestBed = async() =>{
// }

// TestBed();


// Get balance

app.get('/getBalance',async(req,res)=>{
    try{
        await contract.methods.getBalance().call((err,result)=>{
            if(err){
                console.log(err);
            }
            res.status(200).json({
                msg:"Balance fetched",
                balance:`INFY ${result}`
            })
        })
    }
    catch(err){
        console.log(err);
    }
});

// Deposit balance

app.post('/deposit',async(req,res)=>{
    try{
        const amount = req.body.amount;
        console.log('Mining started');
        await contract.methods.depositBalance(amount).send({from:account_address,gas:8000000})
        .on('error',function(error){
            console.log('There was a problem in transasction')
            return res.status(500).json({
                msg:"There was a problem in transasction",
                error:error
            })
        })
        .on('transactionHash', function(transactionHash){
            return res.status(200).json({
                msg:"Your transaction is in progress now. Completion may take a while due to high demand",
                hash:transactionHash
            })
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg:"There was a problem in transasction",
            error:error
        })
    }
});

//Withdraw balance

app.post('/withdraw',async(req,res)=>{
    try{
        const amount = req.body.amount;
        const balance = await contract.methods.getBalance().call();
        if(balance - amount < 0){
            return res.status(400).json({
                msg:"Insufficient balance"
            })
        }

        console.log('Mining started');
        await contract.methods.withdrawBalance(amount).send({from:account_address,gas:8000000})
        .on('error',function(error){
            console.log('There was a problem in withdrawal')
            return res.status(500).json({
                msg:"There was a problem in withdrawal",
                error:error
            })
        })
        .on('transactionHash', function(transactionHash){
            return res.status(200).json({
                msg:"Your transaction is in progress now. Completion may take a while due to high demand",
                hash:transactionHash
            })
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            msg:"There was a problem in withdrawal",
            error:error
        });
    }
});


app.listen(8888,()=>{
    console.log('Server started');
})