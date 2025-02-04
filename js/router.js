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

    // создаем слушателя события hashchange окна
    init() {
        const r = this.routes;
        this.hashChanged(this, r);
        (function(scope, r) {
            window.addEventListener('hashchange', () => {
                scope.hashChanged(scope, r);
            });
        })(this, r);
    },

    // загрузка маршрута или переход на дефолтный
    hashChanged(scope, r) {
        if (window.location.hash.length) {
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route);
                    break;
                }
            }
        } else {
            for (let i = 0; i < r.length; i++) {
                const route = r[i];
                if (route.default) {
                    scope.goToRoute(route);
                    break;
                }
            }
        }
    },

    goToRoute(route) {
        (function(scope) {
            const url = 'pages/' + route.name + '/' + route.htmlName;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // add css for html
                    scope.addCssToPage(route);

                    // add html
                    scope.rootElem.innerHTML = this.responseText;

                    // add js for html
                    scope.addJavaScriptToPage(route);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    },

    addCssToPage(route) {
        const links = document.querySelectorAll('link');
        for (let key in links) {
            if (links[key].href?.includes(route.cssName)) {
                return;
            }
        }

        const header = document.getElementsByTagName('head')[0];
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.type = 'text/css';
        newLink.href = 'pages/' + route.name + '/' + route.cssName;

        header.append(newLink);
    },

    addJavaScriptToPage(route) {
        const scripts = document.querySelectorAll('script');
        for (let key in scripts) {
            if (scripts[key].src?.includes(route.jsName)) {
                return;
            }
        }

        const body = document.getElementsByTagName('body')[0];
        const newScript = document.createElement('script');
        newScript.src = 'pages/' + route.name + '/' + route.jsName;

        body.append(newScript);
    }
};