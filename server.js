#!/usr/bin/env node

var formidable = require('formidable');
var express = require('express');
var app = express();

app.use(express.static('doc'));

app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var file = files.file;
        res.send(file.name + '上传成功！');
    });
});

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on %s:%d', host, port);
});