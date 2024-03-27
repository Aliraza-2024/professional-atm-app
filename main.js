import inquirer from 'inquirer';
class ATM {
    balance;
    pin;
    constructor(initialBalance, pin) {
        this.balance = initialBalance;
        this.pin = pin;
    }
    authenticate(pin) {
        return this.pin === pin;
    }
    checkBalance() {
        console.log(`Your current balance is $${this.balance}`);
    }
    deposit(amount) {
        if (amount <= 0) {
            console.log("Invalid amount");
            return;
        }
        this.balance += amount;
        console.log(`Deposited $${amount}. Your new balance is $${this.balance}`);
    }
    withdraw(amount) {
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
    const { pin } = await inquirer.prompt({
        type: 'input',
        name: 'pin',
        message: 'Welcome to the ATM. Please enter your PIN:'
    });
    // Replace '1234' with your desired default PIN
    const atm = new ATM(987123, '1234'); // Starting balance and default PIN
    if (!atm.authenticate(pin)) {
        console.log("Incorrect PIN. Exiting...");
        return;
    }
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
        });
        switch (action) {
            case 'Check Balance':
                atm.checkBalance();
                break;
            case 'Deposit':
                const depositAmount = await inquirer.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter deposit amount:'
                });
                atm.deposit(depositAmount.amount);
                break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt({
                    type: 'number',
                    name: 'amount',
                    message: 'Enter withdrawal amount:'
                });
                atm.withdraw(withdrawAmount.amount);
                break;
            case 'Exit':
                console.log('Exiting...');
                return;
        }
    }
}
main();
