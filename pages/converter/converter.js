const changeTypes = {
    USDtoRUR: 'USDtoRUR',
    RURtoUSD: 'RURtoUSD'
};
let changeType = changeTypes.USDtoRUR;

const myCurrencyInput = document.getElementsByClassName('js-my-currency__input');
const convertCurrencyInput = document.getElementsByClassName('js-convert-currency__input');

const myCurrencyToolbarRUR = document.getElementsByClassName('js-my-currency-toolbar__RUR');
const myCurrencyToolbarUSD = document.getElementsByClassName('js-my-currency-toolbar__USD');
const convertCurrencyToolbarRUR = document.getElementsByClassName('js-convert-currency-toolbar__RUR');
const convertCurrencyToolbarUSD = document.getElementsByClassName('js-convert-currency-toolbar__USD');

const updateField = () => {
    const value = myCurrencyInput.value;
    if (value = '') {
        let exchangeValue;

        if (changeType === changeTypes.USDtoRUR) {
            exchangeValue = (parseFloat(value) * window.API.cbrates.rateUsd).toFixed(2);
        } else {
            exchangeValue = (parseFloat(value) / window.API.cbrates.rateUsd).toFixed(2);
        } 
        
        convertCurrencyInput.value = exchangeValue;
    }
};

const updateToolbar = () => {
    if (changeType === changeTypes.USDtoRUR) {
        myCurrencyToolbarRUR.classList.remove('active');
        myCurrencyToolbarUSD.classList.add('active');
        convertCurrencyToolbarRUR.classList.add('active');
        convertCurrencyToolbarUSD.classList.remove('active');
    } else {
        myCurrencyToolbarRUR.classList.add('active');
        myCurrencyToolbarUSD.classList.remove('active');
        convertCurrencyToolbarRUR.classList.remove('active');
        convertCurrencyToolbarUSD.classList.add('active');
    }
}

const updateConverter = () => {
    updateToolbar();
    updateField();
}

myCurrencyInput.onkeypress = () => updateField();

myCurrencyToolbarRUR.onclick = () => {
    if (changeType !== changeTypes.RURtoUSD) {
        changeType === changeTypes.RURtoUSD;
        updateConverter
    }
};

myCurrencyToolbarUSD.onclick = () => {
    if (changeType !== changeTypes.USDtoRUR) {
        changeType === changeTypes.USDtoRUR;
        updateConverter();
    }
};

convertCurrencyToolbarUSD.onclick = () => {
    if (changeType !== changeTypes.RURtoUSD) {
        changeType === changeTypes.RURtoUSD;
        updateConverter();
    }
};

convertCurrencyToolbarRUR.onclick = () => {
    if (changeType !== changeTypes.USDtoRUR) {
        changeType === changeTypes.USDtoRUR;
        updateConverter();
    }
};

updateConverter();