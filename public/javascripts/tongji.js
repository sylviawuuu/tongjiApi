(function (app) {
    app.controller('tongjiCtrl', function ($scope, $http, $window) {
        var resData;
        var xDate = [];
        var indexData = [];
        var date = new Date();
        var today = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();

        var optionPV = {
            title: {
                text: "PV"
            },
            tooltip: {},
            legend: {
                data: ["访问量"]
            },
            xAxis: {
                data: xDate
            },
            yAxis: {},
            series: [{
                name: "访问量",
                type: "bar",
                //color: ["#ccc"],
                data: ["100", "200", "300"]
            }]
        };
        var optionIP = {
            title: {
                text: "IP"
            },
            tooltip: {},
            legend: {
                data: ["IP访问量"]
            },
            xAxis: {
                data: xDate
            },
            yAxis: {},
            series: [{
                name: "IP访问量",
                type: "bar",
                color: ["#4587FF"],
                data: ["100", "200", "300"]
            }]
        };
        var optionUV = {
            title: {
                text: "UV"
            },
            tooltip: {},
            legend: {
                data: ["用户量"]
            },
            xAxis: {
                data: xDate
            },
            yAxis: {},
            series: [{
                name: "用户量",
                type: "bar",
                color: ["#65B73F"],
                data: ["100", "200", "300"]
            }]
        };

        var chartPV = echarts.init(document.getElementById("chart-pv"));
        var chartIP = echarts.init(document.getElementById("chart-ip"));
        var chartUV = echarts.init(document.getElementById("chart-uv"));

        $http
            .post('data/', {
                startDate: '20190626',
                endDate: today
            })
            .success(function (data) {
                resData = data;
                var fields = data.result.fields.slice(1);
                var i = 0;
                var j = 0;
                // 获取日期坐标
                for (i = 0; i < data.result.items[0].length; i++) {
                    xDate.push(data.result.items[0][i][0]);
                }
                // 获取数值
                for (j = 0; j < fields.length; j++) {
                    var d = {};
                    d.title = fields[j];
                    d.data = [];
                    for (i = 0; i < data.result.items[1].length; i++) {
                        d.data.push(data.result.items[1][i][j]);
                    }
                    indexData.push(d);
                }
                for (i = 0; i < indexData.length; i++) {
                    if (indexData[i].title === "pv_count") {
                        optionPV.series[0].data = indexData[i].data;
                    } else if (indexData[i].title === "visitor_count") {
                        optionUV.series[0].data = indexData[i].data;
                    } else if (indexData[i].title === "ip_count") {
                        optionIP.series[0].data = indexData[i].data;
                    }
                }
                chartPV.setOption(optionPV);
                chartIP.setOption(optionIP);
                chartUV.setOption(optionUV);
            })
            .error(function (err) {
                $window.alert(err);
            });

    })
})(app);
