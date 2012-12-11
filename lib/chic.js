(function (exports) {
    'use strict';


    // Utilities

    // Loop over object properties
    function forEachProp (obj, callback, thisArg) {
        var name, value;
        for (name in obj) {
            if (obj.hasOwnProperty(name)) {
                value = obj[name];
                callback.call(thisArg || value, value, name, obj);
            }
        }
    }

    // Check whether a value is a function
    function isFn (val) {
        return (typeof val === 'function');
    }

    // Apply a super-method to a function.
    // `this.sup` is set to `sup` inside calls to `fn`.
    function applySuperMethod (fn, sup) {
        return function () {
            var prev, result;
            prev = this.sup;
            this.sup = sup;
            result = fn.apply(this, arguments);
            this.sup = prev;
            return result;
        };
    }


    // Class abstraction

    // Base class
    function Class () {}

    // Extend
    Class.extend = function (props) {
        var Parent = this;
        var extendingFlag = '*extending*';
        var proto;

        // Extension
        Parent[extendingFlag] = true;
        proto = new Parent();
        delete Parent[extendingFlag];

        // Add new properties
        forEachProp(props, function (value, name) {
            if (isFn(value)) {
                return proto[name] = applySuperMethod(value, Parent.prototype[name]);
            }
            proto[name] = value;
        });

        // Construct
        function Class () {
            if (!Class[extendingFlag] && isFn(proto.init)) {
                proto.init.apply(this, arguments);
            }
        }

        // Add prototypal properties
        Class.prototype = proto;
        Class.prototype.constructor = Class;

        // Add extend method and return
        Class.extend = Parent.extend;
        return Class;

    };


    // Exports
    exports.Class = Class;


} (typeof exports === 'undefined' ? (this.chic = this.chic || {}) : exports));