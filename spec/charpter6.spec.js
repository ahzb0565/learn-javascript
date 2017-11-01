

describe('Charpter 6: Inherit', function(){
    var inherit = require('../lib/myLib');
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

});