#! /usr/bin/env node

import inquirer, { Answers, QuestionCollection } from 'inquirer';

class ATM {
    private balance: number;
    private readonly pin: string;

    constructor(initialBalance: number, pin: string) {
        this.balance = initialBalance;
        this.pin = pin;
    }

    authenticate(pin: string): boolean {
        return this.pin === pin;
    }

    checkBalance() {
        console.log(`Your current balance is $${this.balance}`);
    }

    deposit(amount: number) {
        if (amount <= 0) {
            console.log("Invalid amount");
            return;
        }
        this.balance += amount;
        console.log(`Deposited $${amount}. Your new balance is $${this.balance}`);
    }

    withdraw(amount: number) {
        if (amount <= 0) {
            console.log("Invalid amount");
            return;
        }
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return;
        }
        this.balance -= amount;
        console.log(`Withdrawn $${amount}. Your new balance is $${this.balance}`);
    }
}

async function main() {
    const { pin } = await inquirer.prompt<Answers>({
        type: 'input',
        name: 'pin',
        message: 'Welcome to the ATM. Please enter your PIN:'
    } as QuestionCollection);

    // Replace '1234' with your desired default PIN
    const atm = new ATM(987123, '1234'); // Starting balance and default PIN

    if (!atm.authenticate(pin)) {
        console.log("Incorrect PIN. Exiting...");
        return;
    }

    while (true) {
        const { action } = await inquirer.prompt<Answers>({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
        } as QuestionCollection);

        switch (action) {
            case 'Check Balance':
                atm.checkBalance();
                break;
            case 'Deposit':
                const depositAmount = await inquirer.prompt<Answers>({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter deposit amount:'
                } as QuestionCollection);
                atm.deposit(depositAmount.amount as number);
                break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt<Answers>({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter withdrawal amount:'
                } as QuestionCollection);
                atm.withdraw(withdrawAmount.amount as number);
                break;
            case 'Exit':
                console.log('Exiting...');
                return;
        }
    }
}

main();
