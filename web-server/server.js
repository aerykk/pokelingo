var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.WEB_SERVER_PORT || 3000);