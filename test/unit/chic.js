/*jshint maxlen: 140 */
/*global setup, suite, test */
(function () {
    'use strict';
    
    // Dependencies
    var assert = require('chai').assert;
    var sinon = require('sinon');

    // Test subject
    var chic = require('../../lib/chic');
    var Class = chic.Class;

    // Test suite
    suite('chic (unit):', function () {

        test('should be an object', function () {
            assert.isObject(chic);
        });

        test('should have a Class function', function () {
            assert.isFunction(Class);
        });

        test('should have a Class.extend function', function () {
            assert.isFunction(Class.extend);
        });

        suite('MyClass:', function () {
            var init, foo, MyClass, instance;

            setup(function () {
                init = sinon.spy();
                foo = sinon.spy();
                MyClass = Class.extend({
                    init: init,
                    foo: foo,
                    bar: 123
                });
                instance = new MyClass('foo', 'bar', 'baz');
            });

            test('should be a function', function () {
                assert.isFunction(MyClass);
            });

            test('should have an extend function', function () {
                assert.isFunction(MyClass.extend);
            });

            test('extend function should be a reference to Class.extend', function () {
                assert.strictEqual(MyClass.extend, Class.extend);
            });

            test('prototype should mirror properties of the original argument', function () {
                assert.isDefined(MyClass.prototype.foo);
                assert.isDefined(MyClass.prototype.bar);
            });

            test('construction should call the init method of the prototype', function () {
                assert.isTrue(init.calledOnce);
            });

            test('construction should call the init method of the prototype with the expected arguments', function () {
                assert.isTrue(init.withArgs('foo', 'bar', 'baz').calledOnce);
            });

            test('construction should call the init method of the prototype with the instance as a context', function () {
                assert.strictEqual(init.firstCall.thisValue, instance);
            });

            test('instance of MyClass should be an instance of Class', function () {
                assert.instanceOf(instance, Class);
            });

            test('calling a method should call the original function', function () {
                instance.foo();
                assert.isTrue(foo.calledOnce);
            });

            test('calling a method should call the original function with the expected arguments', function () {
                instance.foo('bar', 'baz', 'qux');
                assert.isTrue(foo.withArgs('bar', 'baz', 'qux').calledOnce);
            });

            test('calling a method should call the original function with the instance as a context', function () {
                instance.foo();
                assert.strictEqual(foo.firstCall.thisValue, instance);
            });

        });

        suite('MyOtherClass extending MyClass:', function () {
            var init, foo, bar, MyClass, MyOtherClass, instance;

            setup(function () {
                init = sinon.spy(function () {
                    this.test = 123;
                });
                foo = sinon.spy();
                bar = sinon.spy();
                MyClass = Class.extend({
                    init: init,
                    foo: foo,
                    bar: bar
                });
                MyOtherClass = MyClass.extend({
                    init: function () {},
                    foo: function () {},
                    bar: function () {
                        this.sup();
                    }
                });
                instance = new MyOtherClass();
            });

            test('properties set in the MyClass constructor should not leak into the MyOtherClass prototype', function () {
                assert.isUndefined(MyOtherClass.prototype.test);
            });

            test('instance of MyOtherClass should be an instance of Class', function () {
                assert.instanceOf(instance, Class);
            });

            test('instance of MyOtherClass should be an instance of MyClass', function () {
                assert.instanceOf(instance, MyClass);
            });

            test('calling an overridden method should not call the original class method', function () {
                instance.foo();
                assert.isTrue(foo.notCalled);
            });

            test('calling this.sup should call the original class method', function () {
                instance.bar();
                assert.isTrue(bar.calledOnce);
            });

            test('calling this.sup should call the original class method with the new instance as a context', function () {
                instance.bar();
                assert.strictEqual(bar.firstCall.thisValue, instance);
            });

        });

    });

} ());