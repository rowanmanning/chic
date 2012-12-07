/*jshint maxstatements: 100 */
/*global suite, test */
(function () {
    'use strict';
    
    // Dependencies
    var assert = require('chai').assert;

    // Test subject
    var chic = require('../../lib/chic');
    var Class = chic.Class;

    // Test suite
    suite('chic (integration):', function () {

        // Test class extension
        test('Animals', function () {

            var Animal = Class.extend({
                init: function () {
                    this.name = 'Animal';
                },
                eat: function () {
                    return this.name + ' is eating';
                }
            });

            var Mammal = Animal.extend({
                init: function () {
                    this.name = 'Mammal';
                }
            });

            var Cat = Mammal.extend({
                init: function (name) {
                    this.name = name;
                },
                eat: function () {
                    return this.sup() + ' like a good kitty';
                }
            });

            var animal = new Animal();
            assert.instanceOf(animal, Class);
            assert.notInstanceOf(animal, Mammal);
            assert.strictEqual(animal.eat(), 'Animal is eating');

            var mammal = new Mammal();
            assert.instanceOf(mammal, Class);
            assert.instanceOf(mammal, Animal);
            assert.notInstanceOf(mammal, Cat);
            assert.strictEqual(mammal.eat(), 'Mammal is eating');

            var mrTibbles = new Cat('Mr Tibbles');
            assert.instanceOf(mrTibbles, Class);
            assert.instanceOf(mrTibbles, Animal);
            assert.instanceOf(mrTibbles, Mammal);
            assert.instanceOf(mrTibbles, Cat);
            assert.strictEqual(mrTibbles.eat(), 'Mr Tibbles is eating like a good kitty');

        });

    });

} ());