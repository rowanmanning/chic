/*jshint maxstatements: 100 */
/*global beforeEach, describe, it */
(function () {
    'use strict';
    
    // Dependencies
    var assert = require('proclaim');

    // Test subject
    var chic = require('../../lib/chic');
    var Class = chic.Class;

    // Test suite
    describe('chic (integration):', function () {

        beforeEach(function (done) {
            // Nasty hack to prevent stack space errors in IE
            // https://github.com/visionmedia/mocha/issues/502
            // (also function wrapper fixes error in Firefox 3.6)
            setTimeout(function () {
                done();
            }, 0);
        });

        // Test class extension
        it('Animals', function () {

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
            assert.isInstanceOf(animal, Class);
            assert.isNotInstanceOf(animal, Mammal);
            assert.strictEqual(animal.eat(), 'Animal is eating');

            var mammal = new Mammal();
            assert.isInstanceOf(mammal, Class);
            assert.isInstanceOf(mammal, Animal);
            assert.isNotInstanceOf(mammal, Cat);
            assert.strictEqual(mammal.eat(), 'Mammal is eating');

            var mrTibbles = new Cat('Mr Tibbles');
            assert.isInstanceOf(mrTibbles, Class);
            assert.isInstanceOf(mrTibbles, Animal);
            assert.isInstanceOf(mrTibbles, Mammal);
            assert.isInstanceOf(mrTibbles, Cat);
            assert.strictEqual(mrTibbles.eat(), 'Mr Tibbles is eating like a good kitty');

        });

    });

} ());