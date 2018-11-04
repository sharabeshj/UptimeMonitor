var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function (req,res) {

    var parsedUrl = url.parse(req.url,true);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //related to url operation
    var queryString = parsedUrl.query;

    // console.log(typeof queryString);
    var headers = req.headers;
    var method = req.method.toLowerCase(); //method is inherrent property of url

    var decoder = new stringDecoder('utf-8');

    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();
        res.end('hello world\n');

        console.log("The path requested : " + trimmedPath + "with method" + method + "with query string", queryString);     //return a object with key value pairs of query strings
        console.log("The url requested has headers ", headers);     //already have some default headers
        console.log("The payload requested", buffer)
    })



});

server.listen(3000,function () {
    console.log('sever is listening on 3000');
});
