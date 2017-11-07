describe('Chapter 10, pattern matching with Regular expressions', function(){
    describe('10.1 defining regular expressions', function(){
        it('String literals', function(){
            //search
            expect('good'.search(/d$/)).toEqual('good'.indexOf('d'));
            expect('good'.search(new RegExp('d$'))).toEqual('good'.indexOf('d'));
            expect('good'.search(/go+d/)).toBe(0);

            // match and result
            var r = 'good'.match(/o+/);
            expect(Array.isArray(r)).toBe(true);
            expect(r[0]).toEqual('oo');
            expect(r.input).toEqual('good');
            expect(r.index).toEqual(1);

            r = 'good gooood'.match(/o{2,4}/);
            expect(r[0]).toEqual('oo');
            expect(r.length).toEqual(1);

            // global match
            r = 'good gooood'.match(/o{2,4}/g);
            expect(r.length).toBe(2);
            expect(r[1]).toEqual('oooo');

            // Alternation, grouping and references
            r = '"JavaScript"'.match(/(['"])[Jj]ava\s?[Ss]cript(\1)/);
            expect(r.length).toBe(3);
            expect(r[0]).toBe('"JavaScript"');
            expect(r[1]).toBe('"');
            expect(r[2]).toBe('"');

            // specifying match position
            r = 'JavaScript: the definition guilde'.match(/[Jj]ava([Ss]cript)(?=\:)/);
            expect(r.indexOf('JavaScript')).not.toBe(-1);
            expect(r.indexOf('Java')).toBe(-1);
            r = 'Java Javainstring'.match(/\b[Jj]ava\b/);
            expect(r.length).toBe(1);
        });
    });
    it('10.2 String methods for pattern matching', function(){
        var text = 'javascript';
        text.search(/[Jj]ava/);
        text.replace(/javascript/gi, 'JavaScript');
        text.match(/[Ss]cript/);
    });
    it('10.3 RegExp', function(){
        var pattern = /Java/g;
        var r = pattern.exec('JavaScript is much more fun than Java');
        expect(r.index).toBe(0);
        expect(pattern.lastIndex).toBe(4);
        expect(r.length).toBe(1);
        pattern.exec('JavaScript is much more fun than Java');
        expect(pattern.lastIndex).toBe(37);

        pattern = /a/g
        r = pattern.test('abcdabce');
        expect(r).toBe(true);
        expect(pattern.lastIndex).toBe(1);
        r = pattern.test('abcdabcd');
        expect(r).toBe(true);
        expect(pattern.lastIndex).toBe(5);
    })
})