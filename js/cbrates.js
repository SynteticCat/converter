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
                console.log('ALL RIGHT');
                this.rateUsd = request.responseXML;
            } else {
                throw new Error('Error: Unable connect to server. Please check back later ❤');
            }
        } catch(e) {
            alert(e);
        }
        
    }
}