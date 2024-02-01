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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov < 0 ? 'deposit' : 'withdrawal';
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

displayMovements(account1.movements);

const calcDisplayBlance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = balance;
};
calcDisplayBlance(account1.movements);

// calc in, out , intrest
const calcBalance = function (movement) {
  const incomes = movement
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes;
  const outMoney = movement
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outMoney)}`;
  const intrest = movement
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(mov => {
      return mov >= 1;
    })
    .reduce((acc, intrest) => acc + intrest, 0);
  labelSumInterest.textContent = ` ${intrest}`;
};
calcBalance(account1.movements);

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
console.log(accounts);

// createing withdrawal
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
const euroToUsd = 1.1;
const calculateDeposite = function (movements) {
  const deposite = movements
    .filter(mov => mov > 0)
    .map(mov => mov * euroToUsd)
    .reduce((acc, mov) => acc + mov, 0);
  console.log(deposite);
};
calculateDeposite(movements);

const withdrawal = movements.filter(function (mov) {
  return mov < 0;
});
// creating deposite
const deposite = movements.filter(mov => mov > 0);
// counting total value of movements

const balance = movements.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(withdrawal);
console.log(deposite);
console.log(balance);
console.log(movements);
//

// maxvalue in an array with reduce method..
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, 200);

console.log(max);

// challenge 2

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAge.filter(age => age >= 18);
//   console.log(humanAge);
//   console.log(adults);

//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   return average;
// };

// const aver1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const aver2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(aver1, aver2);

// clallenge 3

const calcAverageHumanAge = ages => {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};
const aver1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const aver2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(aver1, aver2);
