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



});