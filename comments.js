// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Parse HTTP request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Listen for HTTP GET requests
app.get('/comments', function(req, res) {
    console.log('GET request received at /comments');
    // Read comments from file
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.log(err);
            res.send('Error reading comments');
        } else {
            // Send comments as JSON
            res.send(data);
        }
    });
});

// Listen for HTTP POST requests
app.post('/comments', function(req, res) {
    console.log('POST request received at /comments');
    // Read comments from file
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.log(err);
            res.send('Error reading comments');
        } else {
            // Parse comments as JSON
            var comments = JSON.parse(data);
            // Add new comment
            comments.push(req.body);
            // Write comments to file
            fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
                if (err) {
                    console.log(err);
                    res.send('Error writing comments');
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

// Start web server on port 3000
app.listen(3000, function() {
    console.log('Web server listening on port 3000');
});