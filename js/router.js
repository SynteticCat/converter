function Router(routes) {
    try {
        if (!routes) {
            throw new Error("Error: routes param is mandatory!");
        } 
        this.constructor(name, htmlName, defaultRoute);
        this.init();
    } catch (e) {
        console.error(e);
    }
};

Router.prototype = {
    routes: null,
    rootElem: null,
    constructor(routes) {
        this.routes = routes;
        this.rootElem = rootElem;
    },
    init() {
        const r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', () => {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        hasChanged(this, r);
    },
    hasChanged(scope, r) {
        if (window.location.hash.length) {
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute(htmlName) {
        (function(scope) {
            const url = 'views/' + htmlName;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};