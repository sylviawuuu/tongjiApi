(function (app) {
    app.controller('districtPVCtrl', function ($scope, $http, $window) {
        var resData;
        var xDistrict= [];
        var indexData = [];
        var date = new Date();
        var today = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
        var mapPV = echarts.init(document.getElementById("map-pv"));
        // 模拟访问数
        var geoData = [
            {name: '北京', value: 400},
            {name: '上海', value: 300},
            {name: '江苏', value: 200},
            {name: '四川', value: 150}
        ];
        var geoCoordMap = {
            '北京':[116.46,39.92],
            '天津':[117.2,39.13],
            '河北':[114.48,38.03],
            '山西':[112.53,37.87],
            '内蒙古':[111.65,40.82],
            '辽宁':[123.38,41.8],
            '吉林':[126.57,43.87],
            '黑龙江':[126.63,45.75],
            '上海':[121.48,31.22],
            '江苏':[118.78,32.04],
            '浙江':[120.19,30.26],
            '安徽':[117.27,31.86],
            '福建':[119.3,26.08],
            '江西':[115.89,28.68],
            '山东':[117,36.65],
            '河南':[113.65,34.76],
            '湖北':[114.31,30.52],
            '湖南':[113,28.21],
            '广东':[113.23,23.16],
            '广西':[108.33,22.84],
            '海南':[110.35,20.02],
            '重庆':[106.54,29.59],
            '四川':[104.06,30.67],
            '贵州':[106.71,26.57],
            '云南':[102.73,25.04],
            '西藏':[91.11,29.97],
            '陕西':[108.95,34.27],
            '甘肃':[103.73,36.03],
            '青海':[101.74,36.56],
            '宁夏':[106.27,38.47],
            '新疆':[87.68,43.77],
            '大连':[121.62,38.92],
            '宁波':[121.56,29.86],
            '厦门':[118.1,24.46],
            '青岛':[120.33,36.07],
            '深圳':[114.07,22.62]
        };

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        $http
            .post('district/', {
                startDate: '20190626',
                endDate: today
            })
            .success(function (data) {
                resData = data;
                console.log(resData);
                var i = 0;
                var j = 0;
                // 获取地域列表
                /*for (i = 0; i < data.result.items[0].length; i++) {
                    xDistrict.push(data.result.items[0][i][0]);
                }
                // 获取pv值
                for (i = 0; i < data.result.items[1].length; i++) {
                    indexData.push({
                        name: data.result.items[0][i][0],
                        value: data.result.items[1][i][0]
                    });
                }*/
                console.log(indexData);

                // 散点图配置
                var optionMap = {
                    tooltip: {  trigger: 'item' },
                    // 地图配置
                    geo: {
                        show: true,
                        map: 'china',
                        label: {
                            normal: { show: false },
                            emphasis: { show: false }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#74a7b4',
                                borderColor: '#3B5077'
                            },
                            emphasis: { areaColor: '#74a7b4', show: false }
                        },
                        zoom: 1.2
                    },
                    series: [{ // 散点配置
                        name: '访问量',
                        type: 'effectScatter',        // 带有涟漪特效动画的散点（气泡）图
                        //type: 'scatter',
                        coordinateSystem: 'geo',        //该系列使用的坐标系
                        data: convertData(geoData),
                        //data: convertData(indexData),
                        encode: {
                            value: 2                    // label显示data数组下标为2的值（value）
                        },
                        symbolSize: function (val) {
                            return val[2] / 20;         // 散点的大小
                        },
                        showEffectOn: 'emphasis',       // 何时显示特效，hover
                        rippleEffect: { brushType: 'stroke' },  // 涟漪特效相关配置
                        hoverAnimation: true,
                        label: {                        // 图形上的文本标签
                            normal: {
                                formatter: '{b}',
                                position: 'bottom',
                                show: true
                            },
                            emphasis: { show: true }
                        },
                        itemStyle: {                    // 图形的颜色
                            normal: { color: '#bbdf62' }
                        }
                    }
                        /*, { // 地图配置
                            name: '访问量',
                            type: 'map',
                            mapType: 'china', // 自定义扩展图表类型
                            geoIndex: 0,
                            itemStyle: {
                                normal: {label: {show: true}},
                                emphasis: {label: {show: true}}
                            },
                            data: indexData
                        }*/
                    ]
                };
                mapPV.setOption(optionMap);
                console.log(optionMap);
            })
            .error(function (err) {
                $window.alert(err);
            });

    })
})(app);
