

describe('Charpter 6: Inherit', function(){
    var inherit = require('../lib/myLib');

    describe('6.1 create object', function(){});

    describe('6.2 get and set properties of object', function(){
        var book;

        beforeEach(function(){
            book = {title: 'my book', author: 'Bob'};
        });

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

        it('to ways to get or set properties', function(){
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
            myBook.year = 2017;
            expect(myBook.year).toBe(2017);
            expect(book.year).toBeUndefined();
        });

        it('not throw error when get wrong property name', function(){
            expect(function(){book.notExists}).not.toThrow();
            expect(function(){book.notExists.notExists}).toThrow();
        })
    });

});