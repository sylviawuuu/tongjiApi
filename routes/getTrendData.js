var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../baidu-tongji-config');
var token = config.token;
var username = config.user;
var pwd = config.pwd;
var siteId = config.site_id;

/* GET home page. */
router.post('/', function(req, res, next) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    //var startDate = req.query.startDate;
    //var endDate = req.query.endDate;
    var url = config.url;

    var reqData = {
        "header": {
            "username": username,
            "password": pwd,
            "token": token,
            "account_type": 1
        },
        "body": {
            "site_id": siteId,
            "start_date": startDate,
            "end_date": endDate,
            "metrics": "ip_count,pv_count,visitor_count",
            "method": "trend/time/a",
            "gran": "hour",
            "area": ""
        }
    };

    var resData = '';
    request.post({url: url, form: JSON.stringify(reqData)}, function (err, httpResponse, body) {
        if (err) {
            return res.send(500, err);
        } else {
            resData = JSON.parse(body).body.data[0];
            console.log(resData);
            return res.send(200, resData);
        }
    })
});

module.exports = router;