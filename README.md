LESS Frontend skeleton
======================

Dependencies
------------

Install stuff:

``
npm install
``

``
bower install <jquery/bootstrap/...>
``

Configuration
-------------

You have to configure your CSS/LESS, JS and HTML files manually in **Gruntfile.js**. The JavaScript variables are pretty self explanatory.

Usage
-----

Just call `grunt` or `grunt default` - it will call the default routine which:

- builds project (concats assets and compose HTML files, ..)
- starts local server for *browserSync*
- starts *watch* task to seek for file changes and automatically rebuild project

All your sources in **dev/** folder will be processed and placed into **build/** folder. Place your assets like fonts and/or images to **build/** folder.

To manually build project run `grunt build`. There is also `grunt release` which, in addition to `grunt build`, compiles and minifies the assets - it is intended and recommended for actual release due to its non-trivial processing time.

You can use watcher manually to automatically build your project on file change using `grunt watch`.

You can also build CSS/JS/HTML manually with:

 ``
 grunt buildhtml
 ``

 ``
 grunt buildcss
 ``

 ``
 grunt buildjs
 ``

In your HTML files just include **master.css** stylesheet and **master.js** script.

Deployment
----------

- **Manually:** Just run `grunt release` and copy contents of the **build/** folder to your production server.
- **Using grunt:** Configure your FTP credentials in **.ftppass** JSON file, remote path and server variables in **Gruntfile.js**. Then just run `grunt deploy`. Your project will be built and pushed to the server via FTP automatically.