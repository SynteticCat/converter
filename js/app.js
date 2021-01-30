window.API = {};

window.onload = () => {
    new CentralBankExchangeRates(window.API);

    new Router([
        new Route('converter', 'converter.html', 'converter.css', 'converter.js', true),
        new Route('courses', 'courses.html', 'courses.css', 'courses.js')
    ]);
};