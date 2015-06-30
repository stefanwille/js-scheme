'use strict';

var assert = require('assert');

function Parser(input) {
  this.input = input;

  this.parse = function() {
    return 123;
  };
}

function Symbol(name) {
  this.name = name;
}

function Quote(object) {
  this.object = object;
}

describe('Parser', function () {
  describe('#parse()', function() {
    it('returns the parsed expression', function() {
      var parser = new Parser('12345');
      var expression = parser.parse();
      assert.deepEqual(expression, 12345)
    })

    it('supports lists', function() {
      var expression = new Parser('(3 4 5 6').parse();
      assert.deepEqual(expression, [3, 4, 5, 6])
    })

    it('supports empty lists', function() {
      var expression = new Parser('()').parse();
      assert.deepEqual(expression, [])
    })

    it('supports mixed lists', function() {
      var expression = new Parser('(define a "Hello"').parse();
      assert.deepEqual(expression, [new Symbol('define'), new Symbol('a'), "Hello"])
    })

    it('supports nested lists', function() {
      var expression = new Parser('(define (square x) (* x x))').parse();
      assert.deepEqual(expression, [new Symbol('define'),
        [new Symbol('square'), new Symbol('x')]])
    })

    it('supports unlimited list nesting', function() {
      var expression = new Parser('(1 (2) (3) (((4)))').parse();
      assert.deepEqual(expression, [1, [2], [[3]], [[[4]]]])
    })

    it('supports quoted lists', function() {
      var expression = new Parser("'(1 2 3)").parse();
      assert.deepEqual(expression, new Quote([1, 2, 3]))
    })

    it('returns a new expression each time it gets called', function() {
      var parser = new Parser('"Hello" 1 (1 2 3)');
      assert.deepEqual(parser.parse(), 'Hello');
      assert.deepEqual(parser.parse(), '1');
      assert.deepEqual(parser.parse(), [1, 2, 3]);
    })
  })
})
