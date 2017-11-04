var inherit = require('../lib/myLib');

describe('Chapter 9 class', function(){
    it('9.1 class and prototype: A simple javascript class', function(){
        function range(from, to){  // factory
            var r = inherit(range.methods);
            r.from = from;
            r.to = to;
            return r;
        }

        range.methods = {
            include: function(n){return this.from <= n && n <= this.to;},
            foreach: function(f){
                for (var i = Math.ceil(r.from); i < (this.to - this.from); i++){
                    f(i);
                };
            },
            toString: function(){return '(' + this.from + '...' + this.to + ')';}
        };

        var r1 = range(1,10);
        expect(r1.include(5)).toBe(true);
        expect(r1.include(0)).toBe(false);
        expect(r1.include(11)).toBe(false);
        var r2 = range(3, 8);
        expect(r2.include(5)).toBe(true);
        expect(r2.include(2)).toBe(false);
        expect(r2.include(9)).toBe(false);
    });

    describe('9.2 class and constructor', function(){
        it('A simple class created by constructor', function(){
            function Range(from, to){
                this.from = from;
                this.to = to;
            }
            Range.prototype = {
                include: function(n){return this.from <= n && n <= this.to;},
                foreach: function(f){
                    for (var i = Math.ceil(r.from); i < (this.to - this.from); i++){
                        f(i);
                    };
                },
                toString: function(){return '(' + this.from + '...' + this.to + ')';}
            };

            var r1 = new Range(1,10);
            expect(r1.include(5)).toBe(true);
            expect(r1.include(0)).toBe(false);
            expect(r1.include(11)).toBe(false);
            expect(r1 instanceof Range).toBe(true);
            var r2 = new Range(3, 8);
            expect(r2.include(5)).toBe(true);
            expect(r2.include(2)).toBe(false);
            expect(r2.include(9)).toBe(false);
            expect(r1 instanceof Range).toBe(true);
        });

        it('9.2.1 constructor and class identity', function(){});
        it('9.2.2 the constructor property.', function(){
            function F(){}
            expect(F.prototype.constructor === F).toBe(true);
            expect(new F().constructor === F).toBe(true);  // by default, the F.prototype.constructor == F
            expect(new F() instanceof F).toBe(true);
            F.prototype = {};
            expect(F.prototype.constructor === F).toBe(false);
            expect(new F().constructor === F).toBe(false);  // F.prototype changed and F.prototype.constructor is Object.
            expect(new F() instanceof F).toBe(true);

            F.prototype = {constructor: F};
            expect(F.prototype.constructor === F).toBe(true);
            expect(new F().constructor === F).toBe(true);  // Fixed by explicitly add a constructor to prototype
            expect(new F() instanceof F).toBe(true);

            // another wayt to solve this broken
            function G(){};
            G.prototype = {};
            G.prototype.include = function(){};
            G.prototype.toString = function(){};
            G.prototype.foreach = function(){};
        });
    });
    it('Java style clases', function(){
        function Person(name){
            this.name = name;  // instance field
        }
        Person.prototype.sayHi = function(){return 'Hi, I\'m '+ this.name};  // Instance method
        Person.create = function(name){return new Person(name);};  // class method

        var Bob = new Person('Bob');
        expect(Bob.sayHi()).toBe('Hi, I\'m Bob');
        var Jim = Person.create('Jim');
        expect(Jim.sayHi()).toBe('Hi, I\'m Jim');
    });
    it('augmenting classes', function(){
        function Person(name){
            this.name = name;
        }
        var person = new Person('Jim');
        expect(person.sayHi).toBeUndefined();
        Person.prototype.sayHi = function(){return 'Hi, i\'m Jim';};
        expect(person.sayHi()).toBe('Hi, i\'m Jim');
    })
});