var http = require('http');
var fs = require('fs');
var uc = require('./node_modules/upper-case');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(uc('Hello my friend'));
    res.end();
    // fs.readFile('./index.html', null, function(error, data) {
    //     console.log(error);
    //     if (error) {
    //         res.writeHead(404);
    //         res.write('File not found!');
    //     } else {
    //         res.write(data);
    //     }
    //     res.end();
    // });
}).listen(80);