var express = require('express');
var router = express.Router();
var http = require("http");

/* GET home page. */
router.get('/', function(req, res, next) {
    var options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: '/test/4444',
        method: 'GET',
        headers: {
            "Connection": "keep-alive",
            "Content-Length": 111,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    };
    var request = http.request(options, function (response) {
        console.log(response.statusCode);
        response.on("data",function(chunk){
            console.log(chunk.toString())
        });
    });

    request.on("error",function(err){
        console.log(err.message);
    });
    request.end();
    res.send('success');
});

module.exports = router;