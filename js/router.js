function Router(routes) {
    try {
        if (!routes) {
            throw new Error("Error: routes param is mandatory!");
        } 
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
};

// Router - менеджер маршрутов
// routes: маршруты приложения
// rootElem: корневой элемент, куда будет рендериться html
Router.prototype = {
    routes: null,
    rootElem: null,
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
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
    },
    // загрузка маршрута или переход на дефолтный
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
    // создаем случателя события hashchange окна
    init() {
        const r = this.routes;
        (function(scope, r) {
            window.addEventListener('hashchange', () => {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        hasChanged(this, r);
    }
};