(function (app) {
    app.controller('kpTrendHourCtrl', function ($scope, $http, $window) {
        var resData;
        var xTime = [];
        var indexData = [];
        var date = new Date();
        var today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

        var optionIP = {
            title: {
                text: "IP数"
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
                data: []
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
                data: []
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
                data: []
            }]
        };

        var chartIP = echarts.init(document.getElementById("kp-line-ip"));
        var chartPV = echarts.init(document.getElementById("kp-line-pv"));
        var chartUV = echarts.init(document.getElementById("kp-line-uv"));

        $http
            .post('kaipu-data/', {
                action: 'day',
                timetype: 'day'
            })
            .success(function (data) {
                resData = data;
                if (resData.status === 'success') {
                    var data = resData.data;
                    for (key in data) {
                        // 获取小时坐标
                        xTime.push(key.split('-')[0]);
                        optionIP.series[0].data.push(data[key].ipcounts);
                        optionUV.series[0].data.push(data[key].counts);
                        optionPV.series[0].data.push(data[key].viewcounts);
                    }
                    console.log(xTime);
                    console.log(optionIP);
                    chartIP.setOption(optionIP);
                    chartPV.setOption(optionPV);
                    chartUV.setOption(optionUV);
                } else {
                    $window.alert(resData.errmsg);
                }

                // for (j = 0; j < fields.length; j++) {
                //     for (i = 0; i < data.result.items[1].length; i++) {
                //         d.data.push(data.result.items[1][i][j]);
                //     }
                //     d.data = d.data.reverse();
                //     indexData.push(d);
                // }
                // //console.log(indexData);

                // for (i = 0; i < indexData.length; i++) {
                //     if (indexData[i].title === "pv_count") {
                //         optionPV.series[0].data = indexData[i].data;
                //     } else if (indexData[i].title === "visitor_count") {
                //         optionUV.series[0].data = indexData[i].data;
                //     } else if (indexData[i].title === "ip_count") {
                //         optionIP.series[0].data = indexData[i].data;
                //     }
                // }

            })
            .error(function (err) {
                $window.alert(err);
            });

    })
})(app);
