describe('Chapter 8 Functions', function(){
    it('8.1 Defination of function', function(){
        // defination
        function test(){};
        expect(typeof test).toBe('function');

        // statement
        var f = function(){};
        expect(typeof f).toBe('function');
    });

    describe('8.2 call a function', function(){
        it('as a function', function(){
            function add(x, y){return x + y;}
            expect(add(1, 2)).toBe(3);
        });

        it('as a method', function(){
            var o = {add: function(x, y){return x + y}};
            expect(o.add(1,2)).toBe(3);

            // method chaining
            var p = {
                array: [1,2,3,4,5],
                remove: function(){
                    this.array.pop();
                    return this;
                }
            };

            expect(p.remove().remove().remove().array).toEqual([1,2]);
        });

        it('as a constructor', function(){
            function Person(name, age){
                this.name = name;
                this.age = age;
                this.hello = function(){
                    return 'Hi, I\'m ' + this.name;
                };
            }

            var person = new Person('Bob', 20);
            expect(typeof person).toBe('object');
            expect(person.hello()).toEqual('Hi, I\'m Bob');
        });

        it('use call or apply', function(){
            var o = {x: 1, y: 2, getResult: function(){return this.x + this.y;}};
            var p = {x: 3, y: 4};
            expect(o.getResult()).toBe(3);
            expect(o.getResult.call(p)).toBe(7);
            expect(o.getResult.apply(p)).toBe(7);
        });
    });

    describe('8.3 arguments and parameters', function(){
        it('optional parameters', function(){
            function test(a, b){
                b = b || 0;
                return a + b;
            }

            expect(test(1,2)).toBe(3);
            expect(test(3)).toBe(3);  // parameter 'b' is optional
        });

        it('arguments list', function(){
            function test(a, b){
                if(arguments.length != 2)
                    throw new Error('FUnciont reqired 2 arguments, got '+ arguments.length);
                if(Array.prototype.some.call(arguments, function(n){return typeof n !== 'number';}))
                    throw new TypeError('Some arguments is not a number');
                return a + b;
            }

            expect(function(){test()}).toThrow();
            expect(function(){test(1,2,3)}).toThrow();
            expect(function(){test(1,2)}).not.toThrow();
            expect(function(){test('string',2)}).toThrow();
        });

        it('callee and caller', function(){
            function test(){
                return {callee: arguments.callee, caller: arguments.caller};
            }

            function wrap(){
                return test();
            };

            var result = wrap();
            expect(result.callee).toEqual(test);
            // expect(result.caller).toEqual(wrap);  // TODO: may not support, need double check
        });
    });

    it('8.4 Function as value', function(){
        var a = [function test(){return true;}];
        expect(a[0]()).toBe(true);
        var q = a[0];
        expect(q).toEqual(a[0]);
    });

    it('8.5 anonymous function', function(){
        expect(
            (function(){return 'good';})()
        ).toBe('good');
    });

    describe('8.6 closure', function(){
        it('some simple closures', function(){
            var scope = 'global'
            function checkScope(){
                var scope = 'local';
                return function(){
                    return scope;
                }
            }
            var func = checkScope()
            expect(func()).toBe('local');

            function getCounter(){
                var count = 0;
                return function(){
                    return count++ ;
                };
            }

            var c = getCounter();
            expect(c()).toBe(0);
            expect(c()).toBe(1);
            expect(c()).toBe(2);
        });
        
        it('a closure mistaks', function(){
            function constfuncs(){
                var funcs = [];
                for (var i=0; i< 10; i++)
                    funcs[i] = function(){return i};
                return funcs;
            }

            var funcs = constfuncs();

            expect(funcs[5]()).toBe(10);
        });
    });
    describe('8.7 methods, prototype and constructors', function(){
        it('length', function(){
            function test(){
                return arguments.length;
            }

            expect(test()).toBe(0);
            expect(test(1,2)).toBe(2);
        });

        it('prototype', function(){
            function test(){};
            expect(test.prototype).not.toBeUndefined();
            expect(typeof test.prototype).toEqual('object');
        });

        it('call and apply', function(){
            var o = {x: 1, y: 1, assign: function(x, y){this.x = x; this.y = y; return this;}};
            var p = {x: 3, y: 4};
            o.assign.call(p, 5,6);
            expect(p.x).toBe(5);
            expect(p.y).toBe(6);
            o.assign.apply(p, [7, 8]);
            expect(p.x).toBe(7);
            expect(p.y).toBe(8);
        });

        it('bind', function(){
            function test(y, z){return this.x + y + z;}
            var newFunc = test.bind({x: 1});
            expect(newFunc(2, 3)).toBe(6);
            expect(newFunc(5, 6)).toBe(12);

            var newFunc2 = test.bind({x: 3}, 2);  // bind '2' as parameter 'y'
            expect(newFunc2(4)).toBe(9);  // only 'z' is needed. 3 + 2 + 4
        });

        it('toString', function(){});

        it('Function() constructor', function(){
            var f = new Function('x', 'y', 'return x + y');  // like eval in top function
            expect(typeof f).toBe('function');

            var scope = 'global';
            var creator = function(){
                var scope = 'local';
                // return new Function('return scope;');  // new Function() will compile at the top, so it is 'global' or throw not found error
            };
        });

        it('function like', function(){});
    });

    describe('8.8 functional programing', function(){
        it('map reduce', function(){
            // sum of square
            var square = function(n){ return n*n;};
            var sum = function(x, y){ return x+y;};

            var data = [1,2,3,4,5];
            expect(data.map(square).reduce(sum)).toBe(55);
        });

        it('higher-order function', function(){
            function not(f){
                return function(){
                    var result = f.call(this, arguments);
                    return !result;
                };
            }

            function even(x){
                return x % 2 === 0;
            }

            var odd = not(even);  // get a new function odd

            expect([1,3,5,7,9].every(odd)).toBe(true);
            expect([2,4,6,8,10].every(even)).toBe(true);
        });

        it('partial function', function(){
            var f = function(x, y, z){return x * (y + z);};

            var convertToArray = function(arrayLike, position){
                /* convert array like object to real array */
                return Array.prototype.slice.call(arrayLike, position || 0);
            };

            var partialLeft = function(f){
                /* bind an argument to the left arguments of function f */
                var args = arguments;
                return function(){
                    var a = convertToArray(args, 1);
                    a = a.concat(convertToArray(arguments));
                    return f.apply(this, a);
                };
            }

            expect(f(2,3,4)).toBe(14);  // 2 * 3 + 4
            expect(partialLeft(f, 2)(3,4)).toBe(14);  // 2 * 3 + 4
            expect(partialLeft(f, 2, 3)(4)).toBe(14);  // 2 * 3 + 4
        });

        it('memorization', function(){
            /* create a function that can cache results */
            var memorize = function(f){
                var cache = {};
                return function(){
                    var key = arguments.length + Array.prototype.join.call(arguments, ',')
                    if (key in cache){
                        console.log('found in cache');
                        return cache[key];
                    }
                    result = f.apply(this, arguments);
                    cache[key] = result;
                    return result
                };
            }

            var factorial = memorize(function(n){
                return (n<=1)? 1: n*factorial(n-1);
            });

            expect(factorial(5)).toBe(120);
            expect(factorial(3)).toBe(6);  // this will get result from cache.
        });


    })

});