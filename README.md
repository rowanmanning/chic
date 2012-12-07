
Chic
====

Chic is an extremely simple class-like interface to JavaScript prototypal inheritance.

**Current Version:** *0.0.2*  
**Automated Build Status:** [![Build Status][travis-status]][travis]


Getting Started
---------------

You can use Chic in-browser or on the server side with [Node.js][node]. On the client side, you can either install Chic through [Component][component]:

```sh
$ component install rowanmanning/chic
```

Or by simply including `chic.js` in your page:

```html
<script src="path/to/lib/chic.js"></script>
```

On the server side, install with npm:

```sh
$ npm install chic
```


Usage
-----

In Node.js or using Component, you can include Chic in your script by using require:

```js
var Class = require('chic').Class;
```

If you're just including with a `<script>`, you're all ready to go. The rest of the examples assume you've got the `Class` variable already.

----------

### Create a class

Creating classes is very simple. You extend the base class like this:

```js
var Animal = Class.extend();
```

Obviously you want to add methods to your class, to give it some functionality:

```js
var Animal = Class.extend({
    eat:   function () { ... },
    sleep: function () { ... },
    poop:  function () { ... }
});
```

The `init` method is a special one. This is your class constructor, and is called when a new instance of your class is created. You can set things up in here.

```js
var Animal = Class.extend({
    init: function () {
        this.alive = true;
    }
});
```

----------

### Instantiating a class

Instantiating your new class is just like instantiating any other JavaScript class now. You'll be able to use all those methods you defined!

```js
var fluffy = new Animal();
fluffy.poop(); // Bad Fluffy!
```

----------

### Extending classes

Any class you create is also extendable. You extend custom classes in exactly the same way as the base class:

```js
var Cat = Animal.extend();
```

If you define methods in this extend, then they will override methods of the same name which have been inherited from the parent class. For example:

```js
var Animal = Class.extend({
    speak: function () {
        return 'Roar!';
    }
});

var Cat = Animal.extend({
    speak: function () {
        return 'Miaow?';
    }
});

var mrTibbles = new Cat();
mrTibbles.speak(); // Miaow?
```

If you wish to call the parent method, then that's possible using `this.sup`, which is a reference to the parent method with the same name as the one being called:

```js
var Animal = Class.extend({
    init: function (name) {
        this.name = name;
    },
    eat: function () {
        return this.name + ' is eating';
    }
});

var Cat = Animal.extend({
    eat: function () {
        return this.sup() + ' like a good kitty';
    }
});

var pet = new Cat('Mr Tibbles');
pet.eat(); // Mr Tibbles is eating like a good kitty
```

----------



Development
-----------

* Install dependencies with `npm install`
* Run tests with `npm test`
* Lint code with `npm run-script lint`


Credit
------

This library was inspired by John Resig's great [Simple JavaScript Inheritance post][inspiration].


License
-------

Chic is licensed under the [MIT][mit] license.



[component]: https://github.com/component/component
[inspiration]: http://ejohn.org/blog/simple-javascript-inheritance/
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://secure.travis-ci.org/rowanmanning/chic
[travis-status]: https://secure.travis-ci.org/rowanmanning/chic.png?branch=master
