'use strict';

var assert = require('assert');

function Symbol(name) {
  this.name = name;
}

function Token(token) {
  this.token = token;
}

var LEFT_PARENTHESIS = new Token('(');
var RIGHT_PARENTHESIS = new Token(')');

function Lexer(input) {
  this.next = function() { return true; };
  this.token = function() { return 1; };
}


describe('Lexer', function() {
  describe('#token()', function() {
    it('returns the current token', function() {
      var lexer = new Lexer('1');
      assert.strictEqual(lexer.token(), 1);
    })

    it('can be called many times on the current token', function() {
      var lexer = new Lexer('1');
      assert.strictEqual(lexer.token(), 1);
      assert.strictEqual(lexer.token(), 1);
      assert.strictEqual(lexer.token(), 1);
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
      assert.strictEqual(lexer.token(), 1);
      assert.equal(lexer.next(), true);
      assert.strictEqual(lexer.token(), 2);
      assert.equal(lexer.next(), true);
      assert.strictEqual(lexer.token(), 3);
      assert.equal(lexer.next(), false);
    })

    it('accepts numbers', function() {
      var lexer = new Lexer('12345');
      assert.equal(lexer.token(), 12345);
    })

    it('accepts strings', function() {
      var lexer = new Lexer(' "Hello" ');
      assert.equal(lexer.token(), 'Hello');
    })

    it('accepts symbols', function() {
      var lexer = new Lexer('define + < ready?');
      assert.equal(lexer.token(), new Symbol('define'));
      lexer.next();
      assert.equal(lexer.token(), new Symbol('+'));
      lexer.next();
      assert.equal(lexer.token(), new Symbol('<'));
      lexer.next();
      assert.equal(lexer.token(), new Symbol('ready?'));
      lexer.next();
    })

    it('accepts booleans', function() {
      var lexer = new Lexer('#t #f');
      assert.equal(lexer.token(), true);
      lexer.next();
      assert.equal(lexer.token(), false);
    })

    it('accepts parentheses', function() {
      var lexer = new Lexer('()');
      assert.equal(lexer.token(), LEFT_PARENTHESIS);
      lexer.next();
      assert.equal(lexer.token(), RIGHT_PARENTHESIS);
    })
  })
})


