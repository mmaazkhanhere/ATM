# ATM
An ATM program where the user have options to perform operations like balance inquiry, cash withdrawl, deposit cash, and perform transactions to other users.

To initialise project and create .json file, in terminal type npm init -y

To intitialize TypeScript, in terminal type tsc --init

Now in the package.json, add 'type':'module'

Now tsconfig.json, change

"target":"es2016" to "target":"ES2022: "module":"commonjs" to "module":"NodeNext" and "moduleResolution":"node" to "moduleResolution":"NodeNext"

In terminal, run the following command: npm i @types/node -D, which adds type in node modules folder

Inquirer provides the user interface which the processes such as asking questions, validating answers parsing inputs etc.

In terminal, run the following command to install inqurirer: npm i inquirer Now run this command which install package that contains type definition for the inquirer: npm i -D @types/inquirer

Chalk is another module that is used for styling the format of text and allows us to create our own themes in the node Run the following command to install chalk animation: npm i chalk chalk-animation

Run the following command now: npm i -D @types/chalk-animation

Add the following at the start of code #! /usr/bin/env node
