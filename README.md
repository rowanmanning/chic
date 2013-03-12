Chic
====

Chic is an extremely simple class-like interface to JavaScript prototypal inheritance.

**Current Stable Version:** *1.0.2*  
**Automated Build Status:** [![Build Status][travis-status]][travis]  
**Node Support:** *0.6, 0.8*  
**Browser Support:** *Android Browser 2.2–4.2, Firefox 3.6, Firefox 4–16, Google Chrome 14–23, Internet Explorer 6–10, Mobile Safari iOS 4–6, Opera 12.10, Safari 5–6*


Getting Started
---------------

You can use Chic on the server side with [Node.js][node] and npm:

```sh
$ npm install chic
```

On the client side, you can either install Chic through [Component][component]:

```sh
$ component install rowanmanning/chic
```

or by simply including `chic.js` in your page:

```html
<script src="path/to/lib/chic.js"></script>
```


Usage
-----

In Node.js or using Component, you can include Chic in your script by using require:

```js
var Class = require('chic').Class;
```

Chic also works with AMD-style module loaders, just specify it as a dependency.

If you're just including with a `<script>`, `Class` is available in the `chic` namespace:

```js
var Class = chic.Class;
```

The rest of the examples assume you've got the `Class` variable already.

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

### Instantiating a class

Instantiating your new class is just like instantiating any other JavaScript class now. You'll be able to use all those methods you defined!

```js
var fluffy = new Animal();
fluffy.poop(); // Bad Fluffy!
```

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


Extending Non-Chic Classes
--------------------------

This feature is planned, and will be introduced in the near future. In the meantime, [@jhnns][jhnns] has this functionality working [in his fork][jhnns-fork].


Development
-----------

To develop Chic, you'll need to clone the repo and install dependencies with `make deps`. If you're on Windows, you'll also need to install [Make for Windows][make].

Once you're set up, you can run the following commands:

```sh
$ make deps         # Install dependencies
$ make lint         # Run JSHint with the correct config
$ make test         # Run unit tests in Node
$ make test-server  # Run a server for browser unit testing (visit localhost:3000)
```

When no build target is specified, make will run `deps lint test`. This means you can use the following command for brevity:

```sh
$ make
```

Code with lint errors or no/failing tests will not be accepted, please use the build tools outlined above.


Credit
------

This library was inspired by John Resig's great [Simple JavaScript Inheritance post][inspiration].


License
-------

Chic is licensed under the [MIT][mit] license.



[component]: https://github.com/component/component
[inspiration]: http://ejohn.org/blog/simple-javascript-inheritance/
[jhnns]: https://github.com/jhnns
[jhnns-fork]: https://github.com/jhnns/chic/tree/extendConstructor
[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://travis-ci.org/rowanmanning/chic
[travis-status]: https://travis-ci.org/rowanmanning/chic.png?branch=master
