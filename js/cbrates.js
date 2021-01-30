function CentralBankExchangeRates(rateUsdUrl) {
    this.constructor(rateUsdUrl);
    this.init();
};

CentralBankExchangeRates.prototype = {
    rateUsd: null,
    rateUsdUrl: null,
    constructor(rateUsdUrl) {
        this.rateUsdUrl = rateUsdUrl;
    },
    init() {
        try {
            const req = new XMLHttpRequest();
            req.open('GET', this.rateUsdUrl);
            req.send();
            if (req.status === 200) {
                console.log(req.responseXML);
            } else {
                throw new Error('Error: Unable connect to server. Please check back later ❤');
            }
        } catch(e) {
            alert(e);
        }
        
    }
}