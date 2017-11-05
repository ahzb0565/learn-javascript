

describe('Chapter 6: Object', function(){
    var inherit = require('../lib/myLib').inherit;
    var book;

    beforeEach(function(){
        book = {title: 'my book', author: 'Bob'};
    });

    describe('6.1 create object', function(){});

    describe('6.2 get and set properties of object', function(){
        

        it('undefined property', function(){
            expect(book.test).toBe(undefined);
        });

        it('inherit function', function(){
            var child = inherit(book);
            expect(child.title).toBe('my book');
            expect(child.author).toBe('Bob');
        });

        it('Not change the prototype', function(){
            var child = inherit(book);
            child.title = 'another book';
            expect(child.title).not.toEqual(book.title);
            expect(book.title).toBe('my book');
        });

        it('two ways to get or set properties', function(){
            expect(book.title).toBe('my book');
            expect(book['title']).toEqual(book.title);

            book.year = '2017';
            book['edition'] = 5;
            expect(book['year']).toBe('2017');
            expect(book.edition).toBe(5);
        });

        it('Inheritance of properties', function(){
            var o = {};
            o.x = 1;
            var p = inherit(o);
            p.y = 2;
            var q = inherit(p);
            q.z = 3;

            expect(o.y).toBeUndefined();
            expect(o.x).not.toBeUndefined();

            expect(p.z).toBeUndefined();
            expect(p.y).not.toBeUndefined();
            expect(p.x).not.toBeUndefined();

            expect(q.x).toEqual(1);
            expect(q.y).toEqual(2);
            expect(q.z).toEqual(3);

        });

        it('Override properties', function(){
            var myBook = inherit(book);
            myBook.title = 2017;
            expect(myBook.title).toBe(2017);
            expect(book.title).toBe('my book');
        });

        it('not throw error when get wrong property name', function(){
            expect(function(){book.notExists}).not.toThrow();
            expect(function(){book.notExists.notExists}).toThrow();  // Can't get or set properties of undefined.
        })
    });

    describe('6.3 delete properties', function(){
        it('Can only delete native properties', function(){
            var myBook = inherit(book);
            myBook.test = 'test';
            expect(delete myBook.test).toBe(true);  // return ture and delete native property 'test'
            expect(delete myBook.title).toBe(true);  // return true but do nothing
            expect(delete myBook).toBe(false);  // can't delete native variable
            expect(myBook.test).toBeUndefined();
            expect(myBook.title).toBe('my book');
        });

        it('special delete result', function(){
            expect(delete book.title).toBe(true); // return true and delte 'title'
            expect(delete book.title).toBe(true); // 'title' deleted already, so do nothing and return true
            expect(delete book.toString).toBe(true); // ''toString' is a inherited function, do nothing and return true
            expect(delete 1).toBe(true); // make no sense
        });
    });

    describe('6.4 check properties', function(){
        it('check if object have this property: in', function(){
            var myBook = inherit(book);
            myBook.test = 'test';
            expect('title' in myBook).toBe(true);
            expect('test' in myBook).toBe(true);
            expect('notExists' in myBook).toBe(false);
        });

        it('check if object have this property: !==', function(){
            var myBook = inherit(book);
            myBook.test = 'test';
            myBook.x = undefined;  // assign undefined
            myBook.y = null;  // assign null
            expect(myBook.title !== undefined).toBe(true);
            expect(myBook.test !== undefined).toBe(true);
            expect(myBook.x !== undefined).toBe(false);
            expect(myBook.y !== undefined).toBe(true);  // !== can distinguish null and undefined
        });

        it('check if it is native property: hasOwnProperty', function(){
            var myBook = inherit(book);
            myBook.test = 'test';
            expect(myBook.hasOwnProperty('title')).toBe(false);
            expect(myBook.hasOwnProperty('test')).toBe(true);
            expect(myBook.hasOwnProperty('notExists')).toBe(false);
        });
    });

    describe('6.5 enumerate properties', function(){
        it('check if property enumerable', function(){
            expect(book.propertyIsEnumerable('toString')).toBe(false);
            for(p in book)
                expect(book[p]).not.toBeUndefined();
            expect(p).not.toBeUndefined();
        });
    });

    describe('6.6 getter and setter', function(){
        var p;
        beforeEach(function(){
            p = {
                x: 3.0,  // readable and writable
                y: 4.0, //  readable and writable
                get r(){return Math.sqrt(this.x*this.x + this.y*this.y);},
                set r(newValue){
                    var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
                    var ratio = newValue/oldValue;
                    this.x *= ratio;
                    this.y *= ratio;
                },  // r is readable and writable.

                get theta(){return Math.atan2(this.y, this.x);}  // Only readable;
            };
        })

        it('check property writeable', function(){
            expect(Object.getOwnPropertyDescriptor(p, 'x').writable).toBe(true);
            expect(Object.getOwnPropertyDescriptor(p, 'r').set).not.toBeUndefined();
            expect(Object.getOwnPropertyDescriptor(p, 'r').get).not.toBeUndefined();
            expect(Object.getOwnPropertyDescriptor(p, 'theta').get).not.toBeUndefined();
            expect(Object.getOwnPropertyDescriptor(p, 'theta').set).toBeUndefined();
        });

        it('get value of an accessor property', function(){
            expect(p.r).toEqual(5);
            p.r = 10;
            expect(p.x).toEqual(6);
            expect(p.y).toEqual(8);

            expect(p.theta).not.toBeUndefined();

            old = p.theta;
            p.theta = 6;
            expect(p.theta).toEqual(old);  // not change
        });
    });

    describe('6.7 Property\'characteristics', function(){
        it('Check native variable\'s characteristic', function(){
            expect(Object.getOwnPropertyDescriptor({x:1}, 'x'))
                .toEqual({value: 1, writable: true, configurable: true, enumerable: true});

            var character = Object.getOwnPropertyDescriptor({$n: 1, set r(v){this.$n = v;}, get r(){return this.$n;}}, 'r');
            expect(Object.keys(character).sort()).toEqual(['set', 'get', 'enumerable', 'configurable'].sort());
            expect(typeof character.set).toEqual('function');
        });

        it('define a single property', function(){
            var o = {}
            Object.defineProperty(o, 'x', {value: 1, writable: true, enumerable: false, configurable: true});
            expect(Object.keys(o).indexOf('x')).toEqual(-1);  // property 'x' not enumerable

            Object.defineProperty(o, 'y', {value: 2, writable: false});
            o.y = 3;  // This will throw error in strict model
            expect(o.y).toBe(2);  // Can't assign value to this readonly property
        });

        it('define properties', function(){
            var o = {};
            Object.defineProperties(o, {
                x: {value: 1, enumerable: false},
                y: {value: 2, writable: false},
                r: {get: function(){return this.x}, configurable: true}
            });

            expect(Object.keys(o).indexOf('x')).toEqual(-1);  // property 'x' not enumerable
            o.y = 3;  // This will throw error in strict model
            expect(o.y).toBe(2);  // Can't assign value to this readonly property
            expect(o.r).toEqual(o.x); 
        })
    });

    describe('6.8 Three characteristics of object: prototype, class, extensiable attribute', function(){
        it('Check if object is the prototype of another', function(){
            var o = {x: 1};
            var p = inherit(o);
            expect(o.isPrototypeOf(p)).toBe(true);
        });

        it('class attribute', function(){
            // use toString function(inherited from Object.prototype) to get class attribute
            var classof = function(o){
                if(o === null) return 'Null';
                if(o === undefined) return 'Undefined';
                return Object.prototype.toString.call(o).slice(8, -1);
            }

            expect(classof(null)).toBe('Null');
            expect(classof(undefined)).toBe('Undefined');
            expect(classof({})).toBe('Object');
            expect(classof('string')).toBe('String');
            expect(classof(function(){})).toBe('Function');
            expect(classof(5)).toBe('Number');
        });

        it('check and change extensiable', function(){
            var o = {};
            expect(Object.isExtensible(o)).toBe(true);
            expect(Object.isSealed(o)).toBe(false);
            expect(function(){o.x = 1}).not.toThrow();

            Object.preventExtensions(o);
            expect(Object.isExtensible(o)).toBe(false);
            expect(Object.isSealed(o)).toBe(false);
            o.y = 1;
            expect(o.y).toBeUndefined();

            var p = {x:1, get z(){return this.x;}};
            Object.seal(p);
            expect(Object.isExtensible(p)).toBe(false);
            expect(Object.isSealed(p)).toBe(true);
            p.y = 2; p.x = 3;
            expect(p.y).toBeUndefined();
            expect(p.x).toBe(3);  // writable property can be changed

            var q = {x:1};
            Object.freeze(q);
            expect(Object.isExtensible(p)).toBe(false);
            expect(Object.isSealed(p)).toBe(true);
            q.x = 2; q.y = 3;
            expect(q.y).toBeUndefined();
            expect(q.x).toBe(1);  // not changed
        });
    });

    describe('6.9 serialization', function(){
        it('JSON.stringify', function(){
            var o = {x:1, y: true};
            var result = JSON.stringify(o);
            expect(typeof result).toBe('string');
            expect(result).toEqual('{"x":1,"y":true}');
        });

        it('JSON.parse', function(){
            var o = '{"x":1, "y": true}';
            var result = JSON.parse(o);
            expect(typeof result).toBe('object');
            expect(result).toEqual({x:1, y: true});
        });
    });

    describe('6.10 object functions', function(){
        it('toString', function(){
            var o = {x:1};
            expect(o.toString()).toEqual('[object Object]');
        });

        it('toLocaleString', function(){
            var o = {x:1};
            expect(o.toLocaleString()).toEqual('[object Object]');
        });

        it('valueOf', function(){
            var o = {x:1};
            expect(o.valueOf()).toEqual(o);
        });
    });

});