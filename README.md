# Angular Rating 

Current Version
---------------
```
0.0.1
```

Installation
------------
```
bower install angular-rating
```

Requirements
------------

- [AngularJS](http://angularjs.org) Version 1.5 at least
- [Bootstrap CSS](http://getbootstrap.com) 

Usage
=====

### Demo

<a href="#">Demo here</a>.


### Setup

Just include the js file to your html

```html
<script src="/path/to/angular-rating.js"></script>
```

Then, include the module in your code:

```javascript
angular.module('myModule', ['angular-rating'];
```

### Directive

This is a component, so at its most basic:

```html
<rating value="foo" max="5"></rating>
```

This will render the rating contained in `foo` with maximum 5 stars, and 5 is the default if you don't provide max attribute.

`foo` should be an Integar:

```javascript
foo = 1;
foo = 3;
foo = 4;
```

### Attributes

- `value` is the only required attribute that should contain Integar as I mentioned above.
- `max` is optional and this is the whole number of stars you want to show at a time.
- `size` is optional, this option is to provide the size of stars as you want to view them and also provide its unit as well (20px is the default in case it's not provided), just like:
```html
    <rating value="foo" max="5" size="30px"></rating>
    <rating value="foo" max="5" size="10em"></rating>
    <rating value="foo" max="5" size="12rem"></rating>
```
- `color` is optional, this is the color of the filled stars, so you can choose a color of your choice if not it will be `#F3D82C` as default value.


License
=======

MIT

Authors
=======

Medhat Dawoud (@med7atdawoud)
