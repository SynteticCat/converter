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
                const valutes = request.querySelectorAll('Valute');

                for (let valute in valutes) {
                    const valuteCharCode = valute.querySelector('CharCode').textContent;
                    
                    if (valuteCharCode === "USD") {
                        const rateUsdString = valute.querySelector('Value').textContent
                        this.rateUsd = parseFloat(rateUsdString).toFixed(2);
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