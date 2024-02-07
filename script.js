'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements">
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBlance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}`;
};
// calcDisplayBlance(account1.movements);

// calc in, out , intrest
const calcdisplaySummery = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes;
  const outMoney = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outMoney)}`;
  const intrest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(mov => {
      return mov >= 1;
    })
    .reduce((acc, intrest) => acc + intrest, 0);
  labelSumInterest.textContent = ` ${intrest}`;
};
// calcBalance(account1.movements);
const updateUi = function (acc) {
  //desplying movment
  displayMovements(acc.movements);
  // desplaying balence
  calcDisplayBlance(acc);
  // desplaying intrest
  calcdisplaySummery(acc);
};
// Creating userName on accounts array
const CreatUserName = function (accnt) {
  accnt.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(indx => indx[0])
      .join('');
  });
};
CreatUserName(accounts);
// console.log(accounts);

// login functionality
//event handlers
let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // desplying welcome message & UI.
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUi(currentAccount);
  }
});

// Transfer money functionality

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAcount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciverAcount &&
    currentAccount.balance >= amount &&
    reciverAcount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciverAcount.movements.push(amount);

    inputTransferAmount.value = inputTransferTo.value = '';

    updateUi(currentAccount);
    console.log('Valid Transfer');
  }

  //  add positive movement to recipent
});

// loan feture
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc === currentAccount);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// sort movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// some and every method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.some(mov => mov > 0)); //return true
console.log(movements.some(mov => mov < 0)); //return true

// every
console.log(movements.every(mov => mov > 0)); // returns false
console.log(movements.every(mov => mov < 0)); // returns false

// flat and faltMap method

const arr = [[1, 2, 3], [4, 5, 6], 7, 8]; // 1 level nesed
const arr2 = [[1, [2, 3]], [[4, 5], 6], 7, 8]; // 2 level nested
console.log(arr);
console.log(arr2);
//flat
console.log(arr.flat());
console.log(arr2.flat(2));
//
const overAllBalence = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalence);

// with flat map
const overAllBalence2 = accounts
  .flatMap(acc => acc.movements) // flatMap only flat that one level nested
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
console.log(overAllBalence2);
