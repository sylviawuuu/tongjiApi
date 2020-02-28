(function (app) {
    app.controller('trendHourCtrl', function ($scope, $http, $window) {
        var resData;
        var xTime = [];
        var indexData = [];
        var date = new Date();
        var today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

        var optionIP = {
            title: {
                text: "IP数",
            },
            tooltip: {},
            legend: {
                data: ["IP访问量"]
            },
            xAxis: {
                data: xTime
            },
            yAxis: {},
            series: [{
                name: "IP访问量",
                type: "line",
                color: ["#4587FF"],
                data: ["100", "200", "300"]
            }]
        };
        var optionPV = {
            title: {
                text: "浏览量(PV)"
            },
            tooltip: {},
            legend: {
                data: ["浏览量"]
            },
            xAxis: {
                data: xTime
            },
            yAxis: {},
            series: [{
                name: "浏览量",
                type: "line",
                //color: ["#ccc"],
                data: ["100", "200", "300"]
            }]
        };
        var optionUV = {
            title: {
                text: "访客数(UV)"
            },
            tooltip: {},
            legend: {
                data: ["访客数"]
            },
            xAxis: {
                data: xTime
            },
            yAxis: {},
            series: [{
                name: "访客数",
                type: "line",
                color: ["#65B73F"],
                data: ["100", "200", "300"]
            }]
        };

        var chartIP = echarts.init(document.getElementById("line-ip"));
        var chartPV = echarts.init(document.getElementById("line-pv"));
        var chartUV = echarts.init(document.getElementById("line-uv"));
        var chartIP2 = echarts.init(document.getElementById("line-ip2"));
        var chartPV2 = echarts.init(document.getElementById("line-pv2"));
        var chartUV2 = echarts.init(document.getElementById("line-uv2"));

        $http
            .post('trend/', {
                startDate: today,
                endDate: today
            })
            .success(function (data) {
                resData = data;
                //console.log(resData);

                var fields = data.result.fields.slice(1);
                //console.log(fields);
                var i = 0;
                var j = 0;
                var hour = '';
                // 获取小时坐标
                for (i = 0; i < data.result.items[0].length; i++) {
                    hour = data.result.items[0][i][0].substring(0, 5);
                    xTime.push(hour);
                }
                xTime = xTime.reverse();
                // console.log(xTime);
                // 获取数值
                for (j = 0; j < fields.length; j++) {
                    var d = {};
                    d.title = fields[j];
                    d.data = [];
                    for (i = 0; i < data.result.items[1].length; i++) {
                        d.data.push(data.result.items[1][i][j]);
                    }
                    d.data = d.data.reverse();
                    indexData.push(d);
                }
                //console.log(indexData);

                for (i = 0; i < indexData.length; i++) {
                    if (indexData[i].title === "pv_count") {
                        optionPV.series[0].data = indexData[i].data;
                    } else if (indexData[i].title === "visitor_count") {
                        optionUV.series[0].data = indexData[i].data;
                    } else if (indexData[i].title === "ip_count") {
                        optionIP.series[0].data = indexData[i].data;
                    }
                }
                chartIP.setOption(optionIP);
                chartPV.setOption(optionPV);
                chartUV.setOption(optionUV);
                chartIP2.setOption(optionIP);
                chartPV2.setOption(optionPV);
                chartUV2.setOption(optionUV);
            })
            .error(function (err) {
                $window.alert(err);
            });

    })
})(app);
