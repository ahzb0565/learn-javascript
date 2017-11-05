function inherit(p){
    if(p == null) throw TypeError('input is null');
    if(Object.create) return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t!== 'function') throw TypeError('input is not object or function');
    function F(){}
    F.prototype = p;
    return new F();
}

function extend(o, p){
    for(var prop in p){
        o[prop] = p[prop];
    }
    return o;
}

function merge(o, p){
    for(var p in o){
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}

function restrict(){
    for(prop in o){
        if (!(prop in p)) delete o[prop];
    }
    return o;
}

function substract(o, p){
    for(prop in p)
        if (prop in o) delete o[prop];
    return o;
}


function Set(){
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments)
}

Set.prototype.add = function(){
    for(var i =0; i< arguments.length; i ++){
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)){
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};
Set.prototype.remove = function(){
    for (var i = 0; i< arguments.length; i++){
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)){
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

Set.prototype.contains = function(value){
    return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.foreach = function(f, context){
    for(var s in this.values){
        if(this.values.hasOwnProperty(s))
            f.call(context,s);
    }
};
Set._v2s = function(val){
    switch (val){
        case undefined: return 'u';
        case null : return 'n';
        case true : 't';
        case false: 'f';
        default : switch (typeof val){
            case 'number': '#' + val;
            case 'string' : '"' + val;
            default : return '@' + objectId(val);
        }
    }
};

function objectId(o){
    var prop = "|**objectid**|";
    if(!o.hasOwnProperty(prop))
        o[prop] = Set._v2s.next++
    return o[prop];
}

Set._v2s.next = 100;


extend(Set.prototype, {
    toString: function(){
        var s = '{';
        i = 0;
        this.foreach(function(v){
            s += ((i++ > 0) ? ',': '') + v;
        });
        return s + '}';
    },
    toLocaleString: function(){
        var s = '{';
        i = 0;
        this.foreach(function(v){
            if(i++ > 0) s += ',';
            if(v == null) s += v;
            else s += v.toLocaleString();
        });
        return s + '}';
    },
    toArray: function(){
        var a = [];
        this.foreach(function(v){a.push(v);});
        return a;
    }
});

Set.prototype.toJSON = Set.prototype.toArray;


function enumeration(namesToValues){
    var enumeration = function(){throw 'Can\'t Instantiate Enumerations'};

    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function(){return this.name;},
        valueOf: function(){return this.value;},
        toJSON: function(){return this.name;}
    };

    enumeration.values = [];

    for (var name in namesToValues){
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        enumeration[name] = e;
        enumeration.values.push(e);
    }

    enumeration.foreach = function(f, c){
        for(var i =0; i< this.values.length; i++)
            f.call(c, this.values[i]);
    };

    return enumeration;
}

module.exports = {
    inherit: inherit,
    Set: Set,
    enumeration: enumeration,
    merge: merge,
    extend: extend,
    restrict: restrict,
    substract: substract,
};