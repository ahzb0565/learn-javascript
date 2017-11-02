describe('Chapter 7 Array', function(){
    it('7.1 create array', function(){
        var empty = [];
        var primes = [1,2,3];
        var misc = [1.1, true, 'a', ]
        var base = 1;
        var table = [base, base + 1, base + 2];
        var b = [{x: 1}, 'a', function(){return 'a function'}];
        var count = [1, , 3];
        var a = new Array();
        var c = new Array(10);
        var d = new Array(1,2,3,'test', 'testing');
    });

    it('7.2 read and write', function(){
        var l = [];
        l[0] = 'a';
        l[1.000] = 'b';
        expect(l.length).toBe(2);
        expect(l[0]).toBe('a');
        expect(l[1]).toBe('b');
    });

    it('7.3 sparse array', function(){
        var a1 = new Array(5);
        expect(a1.length).toBe(5);
        expect(a1[0]).toBe(undefined);

        var a2 = [];
        expect(a2.length).toBe(0);
        a2[1000] = 'test';
        expect(a2.length).toBe(1001);
    });

    describe('7.4 length', function(){
        it('use length to clear array', function(){
            var a = [1,2,3,4];
            expect(a.length).toBe(4);
            a.length = 0;  // clear array;
            expect(a.length).toBe(0);
            expect(a[0]).toBeUndefined();
        });

        it('make array length unwritable', function(){
            var a = [1,2,3,4];
            Object.defineProperty(a, 'length', {writable: false});  // Object.seal and Object.freeze can do it too.
            a.length = 0;
            expect(a.length).toBe(4);
        });
    });

    describe('7.5 add or remove element', function(){
        var a;
        beforeEach(function(){
            a = [1,2,3];
        });

        it('push and pop', function(){
            a.push(4);
            expect(a.indexOf(4)).toBe(3);
            expect(a.length).toBe(4);
            expect(a.pop()).toBe(4);
            expect(a.length).toBe(3);
        });

        it('shift and unshift', function(){
            a.unshift(0);
            expect(a.indexOf(0)).toBe(0);
            expect(a.length).toBe(4);
            expect(a.shift()).toBe(0);
            expect(a.length).toBe(3);
        });

        it('use delete', function(){
            delete a[1];
            expect(a[1]).toBe(undefined);
            expect(a.length).toBe(3);  // length not change
        });

        it('splice', function(){
            // insert
            a.splice(1, 0, 'a', 'b');
            expect(a).toEqual([1,'a', 'b', 2, 3]);
            // delete
            a.splice(1, 2);
            expect(a).toEqual([1,2,3]);
            // replace
            a.splice(1, 1, 'a');
            expect(a).toEqual([1,'a', 3]);
        });
    });

    it('7.6 iterate array', function(){
        var a = [1,2,3,4,5];
        for(var i = 0; i < a.length; i++){
            expect(a[i]).not.toBeUndefined();
        };

        for(j in a){
            expect(j).not.toBeUndefined();
        };
    });

    it('7.7 Multidimensional array', function(){});
    it('7.8 && 7.9 Array method', function(){
        var a = [2,1,3];
        // join
        expect(a.join()).toEqual('2,1,3');
        // reverse
        expect(a.reverse()).toEqual([3,1,2]);
        // sort
        expect(a.sort()).toEqual([1,2,3]);
        expect(a.sort(function(a, b){return b-a;})).toEqual([3,2,1]);
        expect(a).toEqual([3,2,1]);  // change the list
        // concat
        expect(a.concat([4,5])).toEqual([3,2,1,4,5]);
        expect(a).toEqual([3,2,1]);
        // slice
        expect(a.slice(1,-1)).toEqual([2]);
        // splice
        // push and pop
        // unshift and shift
        // toString and toLocaleString
        // forEach
        var result = [];
        a.forEach(function(n){
            result.push(n);
        });  // forEach no need to return
        expect(result).toEqual(a);
        // map
        expect(a.map(function(n){return n + 1})).toEqual([4,3,2]); // have return value
        // filter
        expect(a.filter(function(n){return n%2 == 0})).toEqual([2]);
        // every
        expect(a.every(function(n){return n>0})).toEqual(true);
        expect(a.every(function(n){return n>2})).toEqual(false);
        // some
        expect(a.some(function(n){return n>2})).toEqual(true);
        // reduce and reduceRight
        expect(a.reduce(function(a, b){return a - b;})).toEqual(0);  // 3-2-1
        expect(a.reduceRight(function(a, b){return a - b;})).toEqual(-4); // 1-2-3
        // indexOf and lastIndexOf
        expect(a.indexOf(2)).toBe(1);
    });

    it('7.10 Check is array', function(){
        var a = [{}];
        expect(Array.isArray(a)).toBe(true);
        expect(typeof a).toBe('object');  // array's type if object
    });

    describe('7.11 array like object', function(){
        it('check if array like', function(){
            function isArrayLike(o){
                if (o &&                                    // not null or undefined
                    typeof o === 'object' &&                // is object
                    isFinite(o.length) &&                   // length is int
                    o.length > 0 &&
                    o.length === Math.floor(o.length) &&
                    o.length < 4294927296)
                    return true;
                else
                    return false;
            }
            expect(isArrayLike([1,2,3,4])).toBe(true);
            expect(isArrayLike({x: 1})).toBe(false);
        });

        it('Use array method on array like object', function(){
            var aLike = {'0': 'a', '1': 'b', '2': 'c', '3': 'd', '4':'e', length: 5};
            expect(Array.prototype.join.call(aLike, ',')).toEqual("a,b,c,d,e");
            // expect(Array.join(aLike, ',')).toEqual("a,b,c,d,e");  // not support on some cases
        });
    });

    it('7.12 Array like string', function(){
        var s = 'test';
        expect(s.charAt(0)).toEqual('t');
        expect(s[1]).toEqual('e');
        expect(Array.prototype.join.call(s, ',')).toEqual('t,e,s,t');
    });

});