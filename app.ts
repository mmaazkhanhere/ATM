#! /usr/bin/env nod

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


var user=[{
    accountNumber:'PK00010001',
    userName:'Sam',
    password:'123456',
    amount:20000
},
{
    accountNumber:'PK00010002',
    userName:'Alex',
    password:'987654',
    amount:30000
},
{
    accountNumber:'PK00010003',
    userName:'Laura',
    password:'laura123',
    amount:60000
}]

var warning:number=3;
var userFinder:number=0;

///////////////////////////////////////////////////////////////////////////////////////

function animationOff(){
    return new Promise((resolve)=>{
        setTimeout(resolve,2500);
    })
}

///////////////////////////////////////////////////////////////////////////////////////

async function animation(){
    let title=chalkAnimation.rainbow("Welcome to the Bank ATM");
    await animationOff();
    let anotherTitle=chalkAnimation.neon('Lets get you started!');
    await animationOff();
    anotherTitle.stop();
}
////////////////////////////////////////////////////////////////////////////////////////

async function welcomeUser(para:number){
    let title=chalkAnimation.karaoke(`Welcome ${user[para].userName}`)
    await animationOff();
    title.stop();
}

////////////////////////////////////////////////////////////////////////////////////////

async function signIn(){
 do{
    let userAccount= await inquirer.prompt({
        name:'account',
        type:'input',
        message:'Enter your account number: '
    });

    userFinder= user.findIndex((obj)=>obj.accountNumber==userAccount.account);

    if(userFinder==-1){
        console.log(`Sorry the entered account number is not present in our records. Try again`);
    };
 }while(userFinder == -1);


 do
 {
    let userPassword= await inquirer.prompt({
    name:'password',
    type:'input',
    message:'Enter your password: '
});

var passwordFinder= user[userFinder].password==userPassword.password;
if(passwordFinder==false){
    warning--;
    if(warning==0){
        console.log('You have complete your warning limit. Call 111-222-333');
    }
    else{
        console.log(`Wrong password. You can try it ${warning} times`);
    }
}
}while(passwordFinder==false && warning >0);

if(passwordFinder===true){
    await welcomeUser(userFinder);
    Menu();
}
}

//////////////////////////////////////////////////////////////////////////////////////////

function balanceInquiry(para:number){
    let balance=user[para].amount;
    console.log(`Username: ${user[para].accountNumber}\nAmount: ${user[para].amount}`);
}

//////////////////////////////////////////////////////////////////////////////////////////

async function cashWithDrawl(para:number){
     let balance=user[para].amount;
     console.log('Your balance is: ',balance);

    do
    {
    do{ 
     var amountToWithDraw= await inquirer.prompt([{
        name:'amountOut',
        type:'number',
        message:'How much money you want to withdraw'
     }]);

     if(amountToWithDraw.amountOut>balance){
        console.log('Entered amount is greater than your actual balance. Please try again!');
       }
    else if(amountToWithDraw.amountOut<0){
        console.log('Incorrect Input. Please correct amount.')
    }
    }while(amountToWithDraw.amountOut>balance || amountToWithDraw.amountOut<0);

    balance=balance-amountToWithDraw.amountOut;
    console.log('Your new balance: ',balance);

    var doAgain=await inquirer.prompt([{
        name:'doagain',
        type:'list',
        message:'Do you want to withdraw more cash?',
        choices:['Yes','No']
    }]);
} while(doAgain.doagain=='Yes')
} 

//////////////////////////////////////////////////////////////////////////////////////////

async function transaction(para:number){
    let balance=user[para].amount;
    console.log(`Your balance: ${balance}`);

    var sendUser=await inquirer.prompt([{
        name:'senduser',
        type:'input',
        message:'Enter the account number of the recipient: '
    }]);
    
    do
    {
        var amountSend=await inquirer.prompt([{
        name:'amountsend',
        type:'number',
        message:'Enter the amount to send: '
     }]);
     if(amountSend.amountsend>balance){
        console.log('Amount is greater than your balance. Please enter correct amount');
     }
    }while(amountSend.amountsend>balance);
    console.log(typeof amountSend.amountsend)

    balance=balance-amountSend.amountsend;
    console.log(`Amount ${amountSend.amountsend} is send to account number ${sendUser.senduser}.`)
    console.log(`Your remaning balance is: ${balance}`)

}
//////////////////////////////////////////////////////////////////////////////////////////

async function cashDeposit(para:number){
    let balance=user[para].amount;
    console.log(`Your current balance is: ${balance}`)
    do{
        var cashIn=await inquirer.prompt([{
            name:'cashdeposit',
            type:'number',
            message:'Enter the amount to deposit: '
         }]);
        if(cashIn.cashdeposit<0){
            console.log('Incorrect input. Please enter amount!')
        }      
    }while(cashIn.cashdeposit<0)
    balance=balance+cashIn.cashdeposit;
    console.log(`Your new balance is: ${balance}`)  
}

//////////////////////////////////////////////////////////////////////////////////////////

async function Menu() {
    const main=await inquirer.prompt([{
        name:'mainMenu',
        type:'list',
        message:'Please select an operation!',
        choices:['Balance Inquiry','Cash Withdrawl','Cash Deposit','Transaction']
    }]);
    switch(main.mainMenu){
        case 'Balance Inquiry':
            balanceInquiry(userFinder);
            break;
        case 'Cash Withdrawl':
            cashWithDrawl(userFinder);
            break;
        case 'Transaction':
            transaction(userFinder);
            break;
        case 'Cash Deposit':
            cashDeposit(userFinder);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////

async function atmProcess(){
    await signIn();
}
await animation();
atmProcess();