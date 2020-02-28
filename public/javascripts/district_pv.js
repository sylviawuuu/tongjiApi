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
        
        
        var optionMap = {
            backgroundColor: 'transparent',
            title: {
                text: '截止本日累计访问总量',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            bmap: {
                center: [104.114129, 37.550339],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: [
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#044161"
                                }
                            },
                            {
                                "featureType": "land",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#064f85"
                                }
                            },
                            {
                                "featureType": "railway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#005b96",
                                    "lightness": 1
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#004981"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#00508b"
                                }
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "green",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#056197",
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "subway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "manmade",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "local",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#029fd4"
                                }
                            },
                            {
                                "featureType": "building",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#1a5787"
                                }
                            },
                            {
                                "featureType": "label",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            }
                    ]
                }
            },
            series : [
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: convertData(geoData.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'bottom',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    type: 'custom',
                    coordinateSystem: 'bmap',
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    animation: false,
                    silent: true,
                    data: [0],
                    z: -10
                }
            ]
        };
        
        mapPV.setOption(optionMap);
        console.log(optionMap);
    })

    app.controller('mapCtrl', function ($scope, $window) {
        var disCountry = new AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: 'CHN',
            depth: 1,
            styles: {
                'nation-stroke': '#fff',
                'coastline-stroke': [0.85, 0.63, 0.94, 1],
                'province-stroke': 'white',
                'city-stroke': 'rgba(255,255,255,0.5)',//中国特有字段
                'fill': function(props){//中国特有字段
                    return 'rgb(93, 118, 166)'
                }
            }
        })
        var map = new AMap.Map('map', {
            mapStyle: 'amap://styles/5a90746650b039b03259a2aa131fa464',
            // mapStyle: 'amap://styles/blue',
            zoom: 4,
            center: [107.4976,32.1697],
            isHotspot: true,
            zoomEnable: false,
            layers:[
                disCountry
            ],
        });
        function getData(callback){
            AMap.plugin('AMap.DistrictSearch', function() {
                var search = new AMap.DistrictSearch();
                search.search('中国', function(status, data) {
                    if (status === 'complete') {
                        var positions = []
                        var provinces = data['districtList'][0]['districtList']
                        for (var i = 0; i < provinces.length; i += 1) {
                            positions.push({
                                name: provinces[i].name,
                                center: provinces[i].center,
                                radius:Math.max(2, Math.floor(Math.random() * 10))
                            })
                        }
                        callback(positions)
                    }
                });
            });
	    }
        function addLayer(positions){
            AMap.plugin('AMap.CustomLayer', function() {
                var canvas = document.createElement('canvas');
                var customLayer = new AMap.CustomLayer(canvas, {
                    zooms: [3, 10],
                    alwaysRender:true,//缩放过程中是否重绘，复杂绘制建议设为false
                    zIndex: 120
                });
                var onRender = function(){
                    var retina = AMap.Browser.retina;
                    var size = map.getSize();//resize
                    var width = size.width;
                    var height = size.height;
                    canvas.style.width = width+'px'
                    canvas.style.height = height+'px'
                    if(retina){//高清适配
                        width*=2;
                        height*=2;
                    }
                    canvas.width = width;
                    canvas.height = height;//清除画布
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = '#f1e71e';
                    ctx.strokeStyle = '#f1e71e';
                    ctx.font="16px 微软雅黑";
                    ctx.beginPath();
                    for (var i = 0; i < positions.length; i += 1) {
                        var center = positions[i].center;
                        var pos = map.lngLatToContainer(center);
                        var r = positions[i].radius;
                        if(retina){
                            pos = pos.multiplyBy(2);
                            r*=2
                        }
                        ctx.moveTo(pos.x+r, pos.y)
                        ctx.arc(pos.x, pos.y, r, 0, 2*Math.PI);
                        ctx.fillText(positions[i].name,pos.x-2*r, pos.y+3*r);
                        
                    }
                    ctx.lineWidth = retina?6:3
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                }
                customLayer.render = onRender;
                customLayer.setMap(map);
            });
        }
        getData(addLayer);
	
        // var layer = new Loca.ScatterPointLayer({
        //     map: map
        // });

        // // 传入原始数据
        // layer.setData(citys, {
        //     lnglat: 'lnglat'   // 指定坐标数据的来源，数据格式: 经度在前，维度在后，数组格式。
        // });

        // // 配置样式
        // layer.setOptions({
        //     unit: 'px',
        //     style: {
        //         radius: 2,     // 圆形半径，单位像素
        //         color: '#b7eff7', // 填充颜色
        //         borderWidth: 0.5,   // 边框宽度
        //         borderColor: '#ffffff'  // 边框颜色
        //     }
        // });

        // layer.render();
    })

    app.controller('map2Ctrl', function ($scope, $window) {
        var myMap = echarts.init(document.getElementById("my-map"));
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
        
        myMap.setOption({
            backgroundColor: 'transparent',
            title: {
                text: '截止本日累计访问总量',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            amap: {
                mapStyle: 'amap://styles/5a90746650b039b03259a2aa131fa464',
                // mapStyle: 'amap://styles/blue',
                zoom: 4,
                center: [107.4976,38.1697],
                //isHotspot: true,
                zoomEnable: false,
                // layers:[
                //     disCountry
                // ],
            },
            series: []
        });

        var map = myMap.getModel().getComponent('amap').getAMap();
        var layer = myMap.getModel().getComponent('amap').getLayer();
        
        var disCountry = new AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: 'CHN',
            depth: 1,
            styles: {
                'nation-stroke': '#fff',
                'coastline-stroke': [0.85, 0.63, 0.94, 1],
                'province-stroke': 'white',
                'city-stroke': 'rgba(255,255,255,0.5)',//中国特有字段
                'fill': function(props){//中国特有字段
                    return 'rgb(93, 118, 166)'
                }
            }
        })
        
        map.add(disCountry);
        
        var series = [
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'amap',
                data: convertData(geoData.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                showEffectOn: 'emphasis',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'bottom',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    },
                    // emphasis: {//高亮状态下的多边形和标签样式
                    //     borderWidth: 1,
                    //     // borderColor: '#d9f4fe',
                    //     areaColor: '#d9f4fe',
                    //     label: {
                    //         shadowColor: '#d9f4fe', //默认透明
                    //         shadowBlur: 10,
                    //         show: true,
                    //         textStyle: {
                    //             fontSize: 12,
                    //             color: '#3db77f'
                    //         }
                    //     }
                    // }
                },
                zlevel: 1
            }
        ];
        // myMap.setOption({
        //     series: series
        // });

        console.log(map);

        layer.render = function() {
            myMap.setOption({
                series: series
            });
       }

    })
    app.controller('map3Ctrl', function ($scope, $window) {
        
        var disCountry = new AMap.DistrictLayer.Country({
            zIndex: 10,
            SOC: 'CHN',
            depth: 1,
            styles: {
                'nation-stroke': '#fff',
                'coastline-stroke': [0.85, 0.63, 0.94, 1],
                'province-stroke': 'white',
                'city-stroke': 'rgba(255,255,255,0.5)',//中国特有字段
                'fill': function(props){//中国特有字段
                    return 'rgb(93, 118, 166)'
                }
            }
        })
        
        var map2 = new AMap.Map('my-map2', {
            mapStyle: 'amap://styles/5a90746650b039b03259a2aa131fa464',
            // mapStyle: 'amap://styles/blue',
            zoom: 3,
            center: [113.4976,12.1697],
            isHotspot: true,
            zoomEnable: false,
            layers:[
                disCountry
            ],
        });

    })
})(app);
