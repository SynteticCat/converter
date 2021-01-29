(function(){
    function init() {
        const router = new Router([
            new Route('converter', 'converter.html', true),
            new Route('courses', 'courses.html')
        ]);
    };
    init();
});