'use strict';

var expect = require('chai').expect;

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
      expect(lexer.token()).to.equal(1);
    })

    it('can be called many times on the current token', function() {
      var lexer = new Lexer('1');
      expect(lexer.token()).to.equal(1);
      expect(lexer.token()).to.equal(1);
      expect(lexer.token()).to.equal(1);
    })
  })

  describe('#next()', function() {
    it('returns true if there are more tokens to read', function() {
      var lexer = new Lexer('1');
      expect(lexer.next()).to.be.true;
    })

    it('returns false if end of file', function() {
      var lexer = new Lexer('');
      expect(lexer.next()).to.be.false;
    })

    it('advances the lexer to the next token', function() {
      var lexer = new Lexer('1 2 3');
      expect(lexer.token()).to.equal(1);
      expect(lexer.next()).to.be.true;
      expect(lexer.token()).to.equal(2);
      expect(lexer.next()).to.be.true;
      expect(lexer.token()).to.equal(3);
      expect(lexer.next()).to.be.false;
    })

    it('accepts numbers', function() {
      var lexer = new Lexer('12345');
      expect(lexer.token()).to.equal(12345);
    })

    it('accepts strings', function() {
      var lexer = new Lexer(' "Hello" ');
      expect(lexer.token()).to.equal('Hello');
    })

    it('accepts symbols', function() {
      var lexer = new Lexer('define + < ready?');
      expect(lexer.token()).to.equal(new Symbol('define'));
      lexer.next();
      expect(lexer.token()).to.equal(new Symbol('+'));
      lexer.next();
      expect(lexer.token()).to.equal(new Symbol('<'));
      lexer.next();
      expect(lexer.token()).to.equal(new Symbol('ready?'));
    })

    it('accepts booleans', function() {
      var lexer = new Lexer('#t #f');
      expect(lexer.token()).to.be.true;
      lexer.next();
      expect(lexer.token()).to.be.false;
    })

    it('accepts parentheses', function() {
      var lexer = new Lexer('()');
      expect(lexer.token()).to.equal(LEFT_PARENTHESIS);
      lexer.next();
      expect(lexer.token()).to.equal(RIGHT_PARENTHESIS);
    })

    it('accepts quoted parentheses', function() {
      var lexer = new Lexer("'()");
      expect(lexer.token()).to.equal("'");
      lexer.next();
      expect(lexer.token()).to.equal(LEFT_PARENTHESIS);
      lexer.next();
      expect(lexer.token()).to.equal(RIGHT_PARENTHESIS);
    })
  })
})

