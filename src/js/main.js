var $ = require('jquery'); // load jquery, might also need window.jQuery = require('jquery')
var Templates = require('./templates'); // load handlebars templates


var html = Templates.hello({name: 'John'}); // render hello template
$('#js-container').html(html); // append html to the container