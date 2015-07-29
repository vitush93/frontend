# LESS Frontend

## Installation and configuration

Run `npm install` to download necessary modules.

I did not include **bower.json** file, so other dependencies are entirely up to you. This environment comes with Bootstrap and jQuery and that's it.

## Grunt

For development, run `grunt` which does following for you:

- compiles your html, css and scripts
- copies images and fonts to `build/` folder
- starts *browserSync*
- starts *watch task*

To get your production assets run `grunt build` which:

- compiles and minifies your html, css and scripts

To use compiled stylesheets and scripts include **master.css** and **master.js** in your html files.

## Usage

### HTML

You can include HTML file in another HTML file using `include "path/filename.html"`. See `dev/index.html` for typical header/footer example.

### JavaScript

In this environment, you can write your scripts in node.js's modular fashion. Browserify will then assemble your application into single `build/js/master.js` file. See `dev/js` scripts for example. `dev/js/main.js` is configured as dependency root for your scripts.

### Stylesheets

This environment uses LESS as its main CSS preprocessor. Import all your stylesheets in `dev/less/main.less`.

