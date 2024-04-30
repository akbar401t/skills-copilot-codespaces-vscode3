//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var jsonfile = require('jsonfile');
var file = 'comments.json';
var comments = jsonfile.readFileSync(file);

//create server
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var method = req.method;

    if (filename == './comments.html') {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }

    //if the request is post
    if (method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            comments.push({ name: post.name, comment: post.comment });
            jsonfile.writeFileSync(file, comments);
            res.writeHead(302, { 'Location': 'http://localhost:8080/comments.html' });
            res.end();
        });
    }

    //if the request is get
    if (method === 'GET') {
        if (filename == './comments') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(comments));
            res.end();
        }
    }

}).listen(8080);
console.log('Server running at http://localhost:8080/');