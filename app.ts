#! /usr/bin/env nod

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


var user=[{
    accountNumber:'PK00010001',
    password:'123456',
    amount:20000
},
{
    accountNumber:'PK00010002',
    password:'987654',
    amount:30000
},
{
    accountNumber:'PK00010003',
    password:'laura123',
    amount:60000
}]

var warning:number=3;
var userFinder:number=0;

///////////////////////////////////////////////////////////////////////////////////////

function stop(){
    return new Promise((resolve)=>{
        setTimeout(resolve,2500);
    })
}

///////////////////////////////////////////////////////////////////////////////////////

async function animation(){
    let title=chalkAnimation.rainbow("Welcome to the Bank ATM");
    await stop();
    let anotherTitle=chalkAnimation.neon('Lets get you started!');
    await stop();
    anotherTitle.stop();
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
    console.log(`Wrong password. You can try it ${warning} times`);
    warning--;
    if(warning==0){
        console.log('You have complete your warning limit. Call 111-222-333');
    }
}
}while(passwordFinder==false && warning >=0)
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
    }while(amountToWithDraw.amountOut>balance || amountToWithDraw.amount<0);

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
        type:'input',
        message:'Enter the amount to send: '
     }]);
     if(amountSend.amountsend>balance){
        console.log('Amount is greater than your balance. Please enter correct amount');
     }
    }while(amountSend.amountsend>balance);
    
    balance=balance-amountSend.amountsend;
    console.log(`Amount ${amountSend.amountsend} is send to account number ${sendUser.senduser}.`)
    console.log(`Your remaning balance is: ${balance}`)

}

//////////////////////////////////////////////////////////////////////////////////////////

async function Menu() {
    const main=await inquirer.prompt([{
        name:'mainMenu',
        type:'list',
        message:'Please select an operation!',
        choices:['Balance Inquiry','Cash Withdrawl','Transaction']
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
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////

async function atmProcess(){
    await signIn();
    await Menu();
}

atmProcess();