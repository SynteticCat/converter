function CentralBankExchangeRates() {
    this.init();
};

CentralBankExchangeRates.prototype = {
    rateUsd: null,
    init() {
        try {
            const request = new XMLHttpRequest();
            request.open('GET', 'https://www.cbr-xml-daily.ru/daily.xml', false);
            request.send(null);

            if (request.status === 200) {
                const valutes = request.responseXML.querySelectorAll('Valute');

                for (let key in valutes) {
                    const valute = valutes[key];
                    const valuteCharCode = valute.querySelector('CharCode').textContent;
                    
                    if (valuteCharCode === "USD") {
                        const rateUsdString = valute.querySelector('Value').textContent;
                        this.rateUsd = parseFloat(parseFloat(rateUsdString.replace(',', '.')).toFixed(2));
                        break;
                    }
                }
            } else {
                throw new Error('Error: Unable connect to server. Please check back later ❤');
            }
        } catch(e) {
            alert(e);
        }
    }
}