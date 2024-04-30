//create web server
//create a server
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    var postData = '';
    req.on('data', function(chunk) {
        postData += chunk;
    });

    req.on('end', function() {
        var pathname = url.parse(req.url).pathname;
        var query = url.parse(req.url).query;
        if (pathname === '/comment') {
            var comment = querystring.parse(postData).comment;
            fs.appendFile('comments.txt', comment + '\n', function(err) {
                if (err) {
                    res.end('error');
                } else {
                    res.end('success');
                }
            });
        } else {
            fs.readFile('comments.txt', function(err, data) {
                if (err) {
                    res.end('error');
                } else {
                    res.end(data);
                }
            });
        }
    });
});
server.listen(3000, function() {
    console.log('server is running at port 3000');
});
//run the server and open the browser and type http://localhost:3000/comments.txt
//enter some comments
//open the file comments.txt and check the comments
//open the browser and type http://localhost:3000/comment?comment=hello
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=how%20are%20you
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=good
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=bad
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=ok
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=bye
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=goodbye
//check the comments.txt file and check the comments
//open the browser and type http://localhost:3000/comment?comment=goodnight
//check