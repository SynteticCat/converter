window.onload = () => {
    window.API = {
        cbrates: new CentralBankExchangeRates()  // get central bank rates
    };

    new Router([
        new Route('converter', 'converter.html', 'converter.css', 'converter.js', true),
        new Route('courses', 'courses.html', 'courses.css', 'courses.js')
    ]);
};