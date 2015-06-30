'use strict';

var assert = require('assert');

function Lexer(input) {
  this.next = function() { return true; };
  this.token = function() { return 'NUMBER'; };
  this.value = function() { return 1; };
}

describe('Lexer', function() {
  describe('#token()', function() {
    it('returns the current tokens type', function() {
      var lexer = new Lexer('1');
      assert.equal(lexer.token(), 'NUMBER');
    })

    it('can be called many times on the current token', function() {
      var lexer = new Lexer('1');
      assert.equal(lexer.token(), 'NUMBER');
      assert.equal(lexer.token(), 'NUMBER');
      assert.equal(lexer.token(), 'NUMBER');
    })
  })

  describe('#value()', function() {
    it('returns the current tokens value', function() {
      var lexer = new Lexer('1')
      assert.strictEqual(1, lexer.value())
    })

    it('can be called many times on the current token', function() {
      var lexer = new Lexer('1');
      assert.equal(lexer.value(), 1);
      assert.equal(lexer.token(), 1);
    })
  })

  describe('#next()', function() {
    it('returns true if there are more tokens to read', function() {
      var lexer = new Lexer('1');
      assert.equal(lexer.next(), true);
    })

    it('returns false if end of file', function() {
      var lexer = new Lexer('');
      assert.equal(lexer.next(), false);
    })

    it('advances the lexer to the next token', function() {
      var lexer = new Lexer('1 2 3');
      assert.equal(lexer.token(), 'NUMBER');
      assert.equal(lexer.next(), true);
      assert.equal(lexer.token(), 'NUMBER');
      assert.equal(lexer.next(), true);
      assert.equal(lexer.token(), 'NUMBER');
      assert.equal(lexer.next(), false);
    })

    it('accepts numbers', function() {
      var lexer = new Lexer('12345');
      assert.equal(lexer.token(), 'NUMBER');
    })

    it('accepts strings', function() {
      var lexer = new Lexer(' "Hello" ');
      assert.equal(lexer.token(), 'STRING');
    })

    it('accepts symbols', function() {
      var lexer = new Lexer('define + < ready?');
      assert.equal(lexer.token(), 'SYMBOL');
      assert.equal(lexer.value(), 'define');
      lexer.next();
      assert.equal(lexer.token(), 'SYMBOL');
      assert.equal(lexer.value(), '+');
      lexer.next();
      assert.equal(lexer.token(), 'SYMBOL');
      assert.equal(lexer.value(), '<');
      lexer.next();
      assert.equal(lexer.token(), 'SYMBOL');
      assert.equal(lexer.value(), 'ready?');
      lexer.next();
    })

    it('accepts booleans', function() {
      var lexer = new Lexer('#t #f');
      assert.equal(lexer.token(), 'BOOLEAN');
      assert.equal(lexer.value(), true);
      lexer.next();
      assert.equal(lexer.token(), 'BOOLEAN');
      assert.equal(lexer.value(), false);
    })

    it('accepts parentheses', function() {
      var lexer = new Lexer('()');
      assert.equal(lexer.token(), "(");
      lexer.next();
      assert.equal(lexer.token(), ")");
    })
  })
})


