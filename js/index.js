$(function () {
    (function () {
        $('.monitor .tabs').on('click', 'a', function () {
            $(this).addClass('active').siblings('a').removeClass('active');
            var index = $(this).index();
            $('.monitor .content').eq(index).show().siblings('.content').hide();
        });
        // 动画 必须要遍历,不然的话这两个里面的内容无法单独复制,再单独添加,两个标签页的内容会都合在一起
        $('.marquee-view .marquee').each(function (i, item) {
            // console.log($(this));
            var rows = $(this).children().clone();
            $(this).append(rows);
        });
    })();
    (function () {
        var myChart = echarts.init(document.querySelector('.pie'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            series: [
                {
                    name: '点位统计',
                    type: 'pie',
                    radius: ['10%', '70%'],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    data: [
                        { value: 20, name: '云南' },
                        { value: 26, name: '北京' },
                        { value: 24, name: '山东' },
                        { value: 25, name: '河北' },
                        { value: 20, name: '江苏' },
                        { value: 25, name: '浙江' },
                        { value: 30, name: '四川' },
                        { value: 42, name: '湖北' },
                    ],
                    // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
                    label: {
                        fontSize: 10,
                    },
                    // 引导线调整
                    labelLine: {
                        // 连接扇形图线长
                        length: 6,
                        // 连接文字线长
                        length2: 8,
                    },
                },
            ],
        });
        // 监听浏览器缩放，图表对象调用缩放resize函数
        window.addEventListener('resize', function () {
            //图表跟着窗口调整大小
            myChart.resize();
        });
    })();
    (function () {
        var myChart = echarts.init(document.querySelector('.bar'));
        var item = {
            // name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065',
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065',
                },
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0',
            },
        };
        var option = {
            // 修改线性渐变色方式 1
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0,
                0,
                0,
                1,
                [
                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                    { offset: 1, color: '#0061ce' }, // 1 结束颜色
                ]
            ),
            tooltip: {
                //鼠标放到柱子上才会触发提示
                trigger: 'item',
            },

            // 直角坐标系内绘图网格（区域）
            grid: {
                top: '3%',
                right: '3%',
                bottom: '3%',
                left: '0%',
                //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
                containLabel: true,
                // 是否显示直角坐标系网格
                show: true,
                //grid 四条边框的颜色
                borderColor: 'rgba(0, 240, 255, 0.3)',
            },

            xAxis: [
                {
                    // 使用类目，必须有data属性
                    type: 'category',
                    // 使用 data 中的数据设为刻度文字
                    data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                    // 刻度设置
                    axisTick: {
                        // true意思：图形和刻度居中中间
                        // false意思：图形在刻度之间
                        alignWithLabel: false,
                        // 不显示刻度线
                        show: false,
                    },
                    // x坐标轴文字标签样式设置
                    axisLabel: {
                        color: '#4c9bfd',
                    },
                    // x坐标轴颜色设置
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)',
                            // width:8,  x轴线的粗细
                            // opcity: 0,   如果不想显示x轴线 则改为 0
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        alignWithLabel: false,
                        // 把y轴的刻度隐藏起来
                        show: false,
                    },
                    axisLabel: {
                        color: '#4c9bfd',
                    },
                    // y轴这条线的颜色样式
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)',
                            // width: 3
                        },
                    },
                    // y轴分割线的颜色样式
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)',
                        },
                    },
                },
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
                },
            ],
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            //图表跟着窗口调整大小
            myChart.resize();
        });
    })();
    // 订单功能
    (function () {
        // 1. 准备数据
        var data = {
            day365: { orders: '20,301,987', amount: '99834' },
            day90: { orders: '301,987', amount: '9834' },
            day30: { orders: '1,987', amount: '3834' },
            day1: { orders: '987', amount: '834' },
        };
        // 获取显示 订单数量 容器
        var $h4Orders = $('.order h4:eq(0)');
        // 获取显示 金额数量 容器
        var $h4Amount = $('.order h4:eq(1)');
        // console.log($h4Amount);
        $('.order').on('click', '.filter a', function () {
            index = $(this).index();
            // 2. 点击切换激活样式
            $(this).addClass('active').siblings().removeClass('active');
            // 3. 点击切换数据
            //要在html里面自定义data-key这个属性
            var currData = data[this.dataset.key];
            // debugger;
            $h4Orders.html(currData.orders);
            $h4Amount.html(currData.amount);
        });
        // 4. 开启定时器切换数据
        var index = 0;
        var $allTab = $('.order .filter a');
        var timer = setInterval(function () {
            // clearInterval(timer);
            index++;
            if (index >= 4) index = 0;
            $allTab.eq(index).click();
        }, 5000);
    })();
    (function () {
        var data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
            ],
        };

        var myChart = echarts.init(document.querySelector('.line'));
        var option = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                // data: ['邮件营销', '联盟广告'],
                textStyle: {
                    color: '#4c9bfd', // 图例文字颜色
                },
                right: '10%', // 距离右边10%
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true, // 显示边框
                borderColor: '#012f4a', // 边框颜色
                containLabel: true, // 包含刻度文字在内
            },

            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false, // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd', // 文本颜色
                },
                axisLine: {
                    show: false, // 去除轴线
                },
                boundaryGap: false, // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false, // 去除刻度
                },
                axisLabel: {
                    color: '#4c9bfd', // 文字颜色
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a', // 分割线颜色
                    },
                },
            },
            color: ['#00f2f1', '#ed3f35'],
            series: [
                {
                    name: '预期销售额',
                    data: data.year[0],
                    type: 'line',
                    // 折线修饰为圆滑
                    smooth: true,
                },
                {
                    name: '实际销售额',
                    data: data.year[1],
                    type: 'line',
                    smooth: true,
                },
            ],
        };
        myChart.setOption(option);

        $('.sales').on('click', '.caption a', function () {
            //点一下就要给index重新赋值,不然下面的定时器会乱,index要减1,因为a在这里的索引号是从1开始的,因为a的上面有一个标题标签
            index = $(this).index() - 1;
            $(this).addClass('active').siblings('a').removeClass('active');
            var type = this.dataset.type;
            //中括号语法会把里面的值当做变量来解析,点语法会把点后面的值当成字符串来解析
            var currData = data[type];
            // 修改图表1的数据
            option.series[0].data = currData[0];
            // 修改图表2的数据
            option.series[1].data = currData[1];
            // 重新设置数据  让图标重新渲染
            myChart.setOption(option);
        });
        var index = 0;
        var timer = setInterval(function () {
            //进来就先让它变成1,因为默认就是停在0那里
            index++;
            if (index >= 4) index = 0;
            $('.sales .caption a').eq(index).click();
        }, 1000);
        $('.sales').hover(
            // 鼠标经过sales，关闭定时器，离开开启定时器
            function () {
                clearInterval(timer);
            },
            function () {
                //离开的时候先关闭一次,再重启定时器,保证每次都只有一个定时器在运行
                clearInterval(timer);
                timer = setInterval(function () {
                    index++;
                    if (index >= 4) index = 0;
                    $('.sales .caption a').eq(index).click();
                }, 1000);
            }
        );
        window.addEventListener('resize', function () {
            //图表跟着窗口调整大小
            myChart.resize();
        });
    })();
    (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector('.radar'));
        // 2.指定配置
        var data = [[90, 19, 56, 11, 34]];
        var lineStyle = {
            normal: {
                color: '#fff',
                width: 1,
                opacity: 0.5,
            },
        };
        var option = {
            tooltip: {
                show: true,
                // 控制提示框组件的显示位置
                position: ['60%', '10%'],
            },
            radar: {
                indicator: [
                    { name: '机场', max: 100 },
                    { name: '商场', max: 100 },
                    { name: '火车站', max: 100 },
                    { name: '汽车站', max: 100 },
                    { name: '地铁', max: 100 },
                ],
                center: ['50%', '50%'],
                radius: '65%',
                shape: 'circle',
                splitNumber: 4,
                name: {
                    textStyle: {
                        color: '#4c9bfd',
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    },
                },
                splitArea: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    },
                },
            },
            series: [
                {
                    name: '北京',

                    type: 'radar',
                    lineStyle: lineStyle,
                    data: data,
                    symbol: 'none',
                    itemStyle: {
                        color: '#F9713C',
                    },
                    areaStyle: {
                        color: 'rgba(238, 197, 102, 0.6)',
                    },
                    // symbol 标记的样式(拐点），还可以取值'rect' 方块 ,'arrow' 三角等
                    symbol: 'circle',
                    // 拐点的大小
                    symbolSize: 5,
                    // 小圆点（拐点）设置为白色
                    itemStyle: {
                        color: '#fff',
                    },
                    // 在圆点上显示相关数据
                    label: {
                        show: true,
                        color: '#fff',
                        fontSize: 10,
                    },
                },
            ],
        };
        // 3.把配置和数据给对象
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            //图表跟着窗口调整大小
            myChart.resize();
        });
    })();
    // 销售模块 饼形图 半圆形 设置方式
    (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector('.gauge'));
        // 2. 指定数据和配置
        var option = {
            series: [
                {
                    name: '销售进度',
                    type: 'pie',
                    // 放大图形
                    radius: ['130%', '150%'],
                    // 移动下位置  套住50%文字
                    center: ['48%', '80%'],
                    //是否启用防止标签重叠策略
                    // avoidLabelOverlap: false,
                    // label: {
                    //     normal: {
                    //         show: false,
                    //     },
                    // },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    hoverOffset: 0,
                    // 起始角度，支持范围[0, 360]
                    startAngle: 180,
                    data: [
                        {
                            value: 125,
                            itemStyle: {
                                // 颜色渐变#00c9e0->#005fc1
                                color: new echarts.graphic.LinearGradient(
                                    // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: '#00c9e0' }, // 0 起始颜色
                                        { offset: 1, color: '#005fc1' }, // 1 结束颜色
                                    ]
                                ),
                            },
                        },
                        { value: 75, itemStyle: { color: '#12274d' } },
                        {
                            value: 200,
                            itemStyle: { color: 'transparent' },
                        },
                    ],
                },
            ],
        };
        // 3. 把数据和配置给实例对象
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            //图表跟着窗口调整大小
            myChart.resize();
        });
    })();
    (function () {
        var hotData = [
            {
                city: '北京', // 城市
                sales: '25, 179', // 销售额
                flag: true, //  上升还是下降
                brands: [
                    //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ],
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ],
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ],
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ],
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ],
            },
        ];
        //生成sup和sub里面的小li
        var supHtml = '';
        //遍历数组,然后把每一条都添加进dom结构里面,操作dom比较耗时,所以最好是一次性添加进去
        $.each(hotData, function (index, item) {
            //用一个三元表达式来判断这个符号是上升还是下降
            var flag = item.flag ? 'icon-up' : 'icon-down';
            supHtml += `<li>
        <span>${item.city}</span>
        <span> ${item.sales} <s class=${flag}></s></span></li>`;
        });
        $('.sup').html(supHtml);
        //鼠标移入前面的小li的时候,生成并渲染后面对应的的小li
        $('.province .sup').on('mouseenter', 'li', function () {
            //鼠标移入的时候把索引号改成这个li的index,不移入的时候就照常从0开始
            index = $(this).index();
            render($(this));
        });
        //生成完毕
        //给第一条li直接执行mouseenter事件
        var lis = $('.province .sup li');
        lis.eq(0).mouseenter();
        //设定时器自动切换
        var index = 0;
        var timer = setInterval(function () {
            index++;
            if (index >= 5) index = 0;
            // lis.eq(index).mouseenter();
            render(lis.eq(index));
        }, 1000);
        //mouseenter会跟hover冲突
        $('.province .sup').hover(
            function () {
                clearInterval(timer);
            },
            function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    index++;
                    if (index >= 5) index = 0;
                    render(lis.eq(index));
                }, 1000);
            }
        );
        //把mouseenter需要执行的东西抽出来,封装成一个函数,解决上面说的mouseenter和hover冲突的问题,这样hover的时候我们就不写mouseenter,而是直接写mouseenter这个事件里面需要执行的代码
        function render(that) {
            that.addClass('active').siblings().removeClass();
            var index = that.index();

            var subHtml = '';
            //写index = 0, item = {}是为了防止报错,如果数组里没有东西的话就会返回0和{}
            $.each($(hotData)[index].brands, function (index = 0, item = {}) {
                var flag = item.flag ? 'icon-up' : 'icon-down';
                subHtml += `<li><span>${item.name}</span><span> ${item.num} <s class=${flag}></s></span></li>`;
            });
            $('.sub').html(subHtml);
        }
    })();
});
