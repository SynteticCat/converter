let banks = [
    { id: '1', name: "Банк 1", sale: 75.20, buy: 75.30 },
    { id: '2', name: "Банк 2", sale: 75.30, buy: 75.45 },
    { id: '3', name: "Банк 3", sale: 75.15, buy: 74.35 },
    { id: '4', name: "Банк 4", sale: 75.25, buy: 75.35 },
    { id: '5', name: "Банк 5", sale: 75.20, buy: 75.45 },
    { id: '6', name: "Банк 6", sale: 75.15, buy: 75.30 },
    { id: '7', name: "Банк 7", sale: 75.10, buy: 75.35 },
    { id: '8', name: "Банк 8", sale: 75.20, buy: 75.30 },
];

const actions = { buy: 'buy', sell: 'sell' };
const action = actions.buy;

const buyCurrencyBtn = document.querySelector('.js-buy-currency');
const sellCurrencyBtn = document.querySelector('.js-sell-currency');
const userValue = document.querySelector('.js-currency-value');
userValue.value = 100;

const initLocalStorage = () => {
    if (!localStorage.getItem('banks')) {
        localStorage.setItem('banks', []);
    }
};

const atLocalStorage = bankID => {
    return localStorage.getItem('banks').split(',').includes(bankID);
};

const addToLocalStorage = bankID => {
    if (!atLocalStorage(bankID)) {
        const newBanks = [...localStorage.getItem('banks').split(','), bankID];
        localStorage.setItem('banks', newBanks);
    }
};

const removeFromLocalStorage = bankID => {
    if (atLocalStorage(bankID)) {
        const newBanks = localStorage.getItem('banks').split(',').filter(
            id => id !== bankID
        );
        localStorage.setItem('banks', newBanks);
    }
};

initLocalStorage();

const updateCoursesToolbar = () => {
    if (action === actions.buy) {
        sellCurrencyBtn.classList.remove('active');
        buyCurrencyBtn.classList.add('active');
    } else {
        sellCurrencyBtn.classList.add('active');
        buyCurrencyBtn.classList.remove('active');
    }
};

const updateBanksList = () => {
    const bankListRows = document.querySelector('.js-bank-list-rows');

    // filter by localStorage
    const banksFirst = banks.filter(a => atLocalStorage(a.id));
    banksFirst.filter((a, b) => a.id - b.id);
    const banksSecond = banks.filter(a => !atLocalStorage(a.id));
    banks = [...banksFirst, ...banksSecond];

    banks.forEach(bank => {
        const newRow = document.createElement('div');
        newRow.classList.add('bank-list-row');

        const newRowSave = document.createElement('div');
        newRowSave.classList.add('bank-row-attr__save');
        if (atLocalStorage(bank.id)) {
            newRowSave.classList.add('saved');
        }
        newRowSave.onclick = () => {
            if (!newRowSave.classList.value.includes('saved')) {
                newRowSave.classList.add('saved');
                addToLocalStorage(bank.id);
            } else {
                newRowSave.classList.remove('saved');
                removeFromLocalStorage(bank.id);
            }
        };

        const newRowName = document.createElement('div');
        newRowName.classList.add('bank-row-attr__name');
        newRowName.innerText = bank.name;

        const newRowCourse = document.createElement('div');
        newRowCourse.classList.add('bank-row-attr__course');
        if (action === actions.buy) {
            newRowCourse.innerText = bank.buy;
        } else {
            newRowCourse.innerText = bank.sell;
        }

        const newRowSum = document.createElement('div');
        newRowSum.classList.add('bank-row-attr__course');
        if (action === actions.buy) {
            newRowSum.innerText = parseFloat((bank.buy * parseFloat(userValue.value)).toFixed(2));
        } else {
            newRowSum.innerText = parseFloat((bank.sell * parseFloat(userValue.value)).toFixed(2));
        }

        newRow.append(newRowSave, newRowName, newRowCourse, newRowSum);
        bankListRows.append(newRow);
    })
};

const updateCourses = () => {
    updateCoursesToolbar();
    updateBanksList();
};

buyCurrencyBtn.onclick = () => {
    if (action !== actions.buy) {
        action = actions.buy;
        updateCourses();
    }
};

sellCurrencyBtn.onclick = () => {
    if (action !== actions.sell) {
        action = actions.sell;
        updateCourses();
    }
};

updateCourses();