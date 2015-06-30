'use strict';

var assert = require('assert');

function Lexer(input) {
  this.next = function() { return true; };
  this.token = function() { return 'NUMBER'; };
}

describe('Lexer', function() {
  describe('#token()', function() {
    it('returns the current token', function() {
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

  describe('#next()', function() {
    it('returns true if there are more tokens to read', function() {
      var lexer = new Lexer('1');
      assert.equal(lexer.next(), true);
    })

    it('returns false if end of file', function() {
      var lexer = new Lexer('');
      assert.equal(lexer.next(), false);
    })

    it('advances to the next token', function() {
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

    it('accepts parentheses', function() {
      var lexer = new Lexer('() ');
      assert.equal(lexer.token(), "(");
    })

  })
})


