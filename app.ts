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
}] //dummy bank users and their details

var warning:number=3; //times a user can enter incorrect passwords
var userFinder:number=0; //index number for user search


function animationOff(){
    return new Promise((resolve)=>{
        setTimeout(resolve,2500);
    })
} //function for time animation will be displayed



async function animation(){
    let title=chalkAnimation.rainbow("Welcome to the Bank ATM");
    await animationOff(); //animation will be displayed for 2.5 secs
    let anotherTitle=chalkAnimation.neon('Lets get you started!');
    await animationOff();
    anotherTitle.stop(); //animation will turn off
}



async function welcomeUser(para:number){
    let title=chalkAnimation.karaoke(`Welcome ${user[para].userName}`) 
    //animation to welcome the user
    await animationOff();
    title.stop();
}



async function signIn(){ //function for user sign in
 do{
    let userAccount= await inquirer.prompt({
        name:'account',
        type:'input',
        message:'Enter your account number: '
    }); //user enter account number

    userFinder= user.findIndex((obj)=>obj.accountNumber==userAccount.account);

    if(userFinder==-1){
        console.log(chalk.bgGray(`Sorry the entered account number is not present in our records. Try again`));
    };
 }while(userFinder == -1); //continue doing unless user enter correct user name


 do
 {
    let userPassword= await inquirer.prompt({
    name:'password',
    type:'input',
    message:'Enter your password: '
}); //user enter password

var passwordFinder= user[userFinder].password==userPassword.password;
if(passwordFinder==false){
    warning--; //if incorrect password, decrement warning
    if(warning==0){ //if all warning are utilised, block the user access
        console.log(chalk.bgRed('You have complete your warning limit. Call 111-222-333'));
    }
    else{
        console.log(`Wrong password. You can try it ${warning} times`);
    }
}
}while(passwordFinder==false && warning >0); /*Continue doing unless password is still
incorrect and another try available */

if(passwordFinder===true){ //if password is correct
    await welcomeUser(userFinder); //display the username, welcoming him/her
    Menu(); /*Display the user if both user is found and password matches to the 
    corresponding user*/
}
}



function balanceInquiry(para:number){ //function to display balance
    let balance=user[para].amount;
    console.log(`Username: ${user[para].accountNumber}\nAmount: ${user[para].amount}`);
}



async function cashWithDrawl(para:number){ //function for cash withdrawl
     let balance=user[para].amount;
     console.log('Your balance is: ',balance); //displaying the current balance

    do 
    {
    do{ 
     var amountToWithDraw= await inquirer.prompt([{
        name:'amountOut',
        type:'number',
        message:'How much money you want to withdraw'
     }]); //user enter cash to withdraw

     if(amountToWithDraw.amountOut>balance){ 
        console.log(chalk.bgGray('Entered amount is greater than your actual balance. Please try again!'));
       }
    else if(amountToWithDraw.amountOut<0){
        console.log(chalk.bgGray('Incorrect Input. Please correct amount.'))
    }
    }while(amountToWithDraw.amountOut>balance || amountToWithDraw.amountOut<0);
    /*Move forward only if enter amount is not more than actual balance and it is not an 
    invalid value */

    balance=balance-amountToWithDraw.amountOut; //subtract amount from actual balance
    console.log(chalk.bgBlue('Your new balance: ',balance)); //displaying new balance

    var doAgain=await inquirer.prompt([{
        name:'doagain',
        type:'list',
        message:'Do you want to withdraw more cash?',
        choices:['Yes','No']
    }]); //ask whether user want to withdraw more cash
} while(doAgain.doagain=='Yes')
//Move forward only if use choose yes
} 



async function transaction(para:number){ //function for transaction
    let balance=user[para].amount;
    console.log(`Your balance: ${balance}`); 

    var sendUser=await inquirer.prompt([{
        name:'senduser',
        type:'input',
        message:'Enter the account number of the recipient: '
    }]); //user enter account number of user to whom amount is to be transfered
    
    do
    {
        do
        {
            var amountSend=await inquirer.prompt([{
            name:'amountsend',
            type:'number',
            message:'Enter the amount to send: '
            }]); //user enter amount to send

            if(amountSend.amountsend>balance){
                console.log(chalk.bgGray('Amount is greater than your balance. Please enter correct amount'));
            }
            else if(amountSend.amountsend<0){
                console.log(chalk.bgGray('Enter amount is incorrect. Please enter correct data'))
            }

        }while(amountSend.amountsend>balance || amountSend.amountsend<0);
        /*Move forward only if amount to be send is less than actual balance */
        balance=balance-amountSend.amountsend;
        //subtract the amount from actual balance    
        console.log(`Amount ${amountSend.amountsend} is send to account number ${sendUser.senduser}.`)
        //show user the detail of transaction
        console.log(chalk.bgBlue(`Your remaning balance is: ${balance}`))
        //show new balance
        var doingItAgain=await inquirer.prompt([{
            name:'doingitAgain',
            type:'list',
            message:'Do you want to do it again?',
            choices:['Yes','No']
        }])
    }while(doingItAgain.doingitAgain=='Yes')
}


async function cashDeposit(para:number){ //function for deposting cash in the bank
    let balance=user[para].amount;
    console.log(`Your current balance is: ${balance}`)

    do{
    
        do{
        var cashIn=await inquirer.prompt([{
            name:'cashdeposit',
            type:'number',
            message:'Enter the amount to deposit: '
         }]);//user amount to deposit

            if(cashIn.cashdeposit<0){
            console.log(chalk.bgGray('Incorrect input. Please enter amount!'))
        }      
        }while(cashIn.cashdeposit<0)
        /*Move forward only if user input is valid */
        balance=balance+cashIn.cashdeposit; //add amount to existing balance
        console.log(chalk.bgBlue(`Your new balance is: ${balance}`)) //show new balance

        var DoAgain=await inquirer.prompt([{
        name:'doingAgain',
        type:'list',
        message:'Do you want to deposit more cash? ',
        choices:['Yes','No']
         }]) //ask the user whether he/she want to add more cash

    }while(DoAgain.doingAgain=='Yes')
    //Move forward only if only user choice is yes
}



async function Menu() { //menu function
    const main=await inquirer.prompt([{
        name:'mainMenu',
        type:'list',
        message:'Please select an operation!',
        choices:['Balance Inquiry','Cash Withdrawl','Cash Deposit','Transaction']
    }]);//user chooses their operation

    switch(main.mainMenu){ //calling function depending on the user choice of operation
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


async function atmProcess(){ //main function where all other functions are being called
    await signIn();
}
await animation(); //calling the animation function
atmProcess(); //calling main function