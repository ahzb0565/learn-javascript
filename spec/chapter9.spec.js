var inherit = require('../lib/myLib').inherit;

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
    it('9.3 Java style clases', function(){
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
    it('9.4 augmenting classes', function(){
        function Person(name){
            this.name = name;
        }
        var person = new Person('Jim');
        expect(person.sayHi).toBeUndefined();
        Person.prototype.sayHi = function(){return 'Hi, i\'m Jim';};
        expect(person.sayHi()).toBe('Hi, i\'m Jim');
    });
    describe('9.5 classes and types', function(){
        var F
        beforeEach(function(){
            F = function(){};
        });

        it('Using instanceof', function(){
            var p = {};
            F.prototype = p;
            var f = new F();
            expect(p.isPrototypeOf(f)).toBe(true);
            expect(f instanceof F);
        });
        it('Using constructor', function(){
            expect(new Number(5).constructor).toEqual(Number);
            expect('test'.constructor).toEqual(String);
            expect(true.constructor).toEqual(Boolean);

            var p = {};
            F.prototype = p;
            expect(p.constructor).not.toBe(F);  // not works on this case
        });
        it('Using constructor name', function(){
            function F(){};
            F.prototype.getName = function(){
                return this.constructor.toString().match(/function\s+(\S+)\(/)[1];
            };
            var f = new F();
            expect(f.getName()).toEqual('F');
        });
        it('Duck typing', function(){});
    });
    describe('9.6 OO', function(){
        it('Set', function(){
            var Set = require('../lib/MyLib').Set;
            var s = new Set();
            s.add(1,2,'test');
            expect(s.contains(2)).toBe(true);
            s.remove(2, 'test');
            expect(s.contains(2)).toBe(false);
        });
        it('enumerate', function(){
            var enumeration = require('../lib/myLib').enumeration;
            var Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});
            var c = Coin.Dime;
            expect(c instanceof Coin).toBe(true);
            expect(c.constructor == Coin).toBe(true);
            expect(Coin.Quarter + 3*Coin.Nickel).toEqual(40);
            expect(Coin.Dime == 10).toBe(true);
            expect(Coin.Dime > Coin.Nickel).toBe(true);
            expect(String(Coin.Dime) + ':' + Coin.Dime).toEqual('Dime:10')
        });
        it('standard conversion method', function(){
            var Set = require('../lib/MyLib').Set;
            var s = new Set();
            s.add(1,2,'test');
            console.log(s.toString());
            console.log(s.toJSON());
            console.log(s.toLocaleString());
        })
    });
});