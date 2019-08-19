var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('md5');
var config = require('../kaipu-tongji-config');

var url = config.url;
var tag = config.tag;
var website = config.website;

/* GET home page. */
router.post('/', function (req, res, next) {
    var action = req.body.action;
    var timetype = req.body.timetype;
    // 生成10位时间戳
    var timestamp = Date.parse(new Date()).toString().substr(0, 10);
    // 生成token 站点+时间戳+kpyapi
    var tokenstr = website + timestamp + tag;
    var token = md5(tokenstr);
    var formData = {
        website: website,
        times: timestamp,
        token: token,
        action: action,
        timetype: timetype
    }
    console.log(formData);
    request.post({ url: url, form: JSON.stringify(formData) }, function (err, httpResponse, body) {
        if (err) {
            return res.send(500, err);
        } else {
            console.log(body);
            return res.send(200, body);
        }
    })
});

module.exports = router;