// Route - конструктор маршрутов
// name: имя маршрута
// htmlName: является ли имя html при загрузке маршрута
// defaultRoute: true, eсли путь маршрута по умолчанию 
function Route (name, htmlName, defaultRoute) {
    try {
        if (!name && !htmlName) {
            throw new Error("Error: name and htmlName params are mandatories!");
        } 
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
};

Route.prototype = {
    name: null,
    htmlName: null,
    cssName: null,
    jsName: null,
    default: null,
    constructor(name, htmlName, cssName, jsName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.cssName = cssName;
        this.jsName = jsName;
        this.default = defaultRoute;
    },
    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
};