var x = 1;
x = 'sdsfds';
function add(x, y) {
    return x + y;
}
var point = {
    x: 1,
    y: 2
};
var Point3 = /** @class */ (function () {
    function Point3(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point3;
}());
function Point4(x, y) {
    var privateX = x;
    this.doStuff = function () {
        console.log(privateX);
    };
}
function plot(p) {
    console.log(p.x, p.y);
}
plot({ x: 1, y: 3, z: 5 });
console.log(add(1, 2));
console.log(add(23, 67));
console.log(add('dsfsdgds', console));
