function inherit(p){
    if(p == null) throw TypeError('input is null');
    if(Object.create) return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t!== 'function') throw TypeError('input is not object or function');
    function F(){}
    F.prototype = p;
    return new F();
}

module.exports = inherit;