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

First, build your project:

``
grunt build
``

All your sources in **dev/** folder will be processed and placed into **build/** folder. Place your assets like fonts and/or images in **build/** folder.

Now you can use watcher to automatically build your project on file change:

``
grunt watch
``

You can also build CSS/JS/HTML manually:

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

- **Manually:** Just copy content of the **build/** folder to your production server.
- **Using grunt:** Configure your FTP credentials in **.ftppass** JSON file, remote path and server variables in **Gruntfile.js**. Then just run `grunt deploy`. Your project will be built and pushed to the server via FTP automatically.