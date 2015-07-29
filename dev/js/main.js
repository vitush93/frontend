var $ = require('jquery');

var helloModule = require('./helloModule');

$(document).ready(function () {
    helloModule('hello world');
});
