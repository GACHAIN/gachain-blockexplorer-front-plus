import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { FormattedMessage } from 'react-intl';
import { Card } from 'antd';
import styles from './node_map.css';

require('echarts/map/js/world.js')
const max = -Infinity;
const getColor = () => {
    // var colors = ['#00F5FF', '#00E5EE', '#00FFFF', '#00C5CD'];
    var colors = ['#00aee6', '#00aee6', '#00aee6', '#00aee6'];
    var index = Math.floor((Math.random() * colors.length));
    return colors[index];
}

const node_map = ({ data, loading }) => {
    let option = {
        title: {
            x: 'center',
            y: 'top'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name;
            },

        },
        visualMap: {
            show: false,
            min: 0,
            max: max,
            inRange: {
                symbolSize: [10, 10]
            }
        },
        geo: {
            name: '',
            //类型
            type: 'map',
            //地图
            map: 'world',
            roam: true,
            aspectScale: 0.75,
            zoom: 1.2,
            scaleLimit: {
                min: 1.2,
                max: 8
            },
            z: 1,
            //图形上的文本标签,这里不显示
            label: {
                emphasis: {
                    show: false
                }
            },
            //地图区域的多边形 图形样式
            itemStyle: {
                //普通状态
                normal: {
                    areaColor: '#024a7c',
                    borderColor: '#eee'
                },
                //高亮状态
                emphasis: {
                    color: 'rgba(0,191,255, 0.2)'
                }
            }
        },
        series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            //可以容纳的动画数量
            // animationThreshold: 50000,
            //是否启用图例 hover 时的联动高亮。
            // legendHoverLink: true,
            //特效类型，目前只支持涟漪特效'ripple'
            effectType: 'ripple',
            //配置何时显示特效，render表示渲染完就显示
            // showEffectOn: 'render',
            //涟漪特效相关配置，period:动画的时间，scale：动画中波纹的最大缩放比例，brushType：波纹的绘制方式，可选 'stroke' 和 'fill'
            rippleEffect: { 'period': 5, 'scale': 3, 'brushType': 'stroke' },
            symbolSize: [2, 10],
            symbolRotate: 15,
            data: data.map(function (itemOpt) {
                return {
                    name: itemOpt.name,

                    value: [
                        itemOpt.longitude,
                        itemOpt.latitude
                    ],

                    // label: {
                    //     emphasis: {
                    //         show: false
                    //     }
                    // },
                    // itemStyle: {
                    //     normal: {
                    //         //color: getColor(),
                    //         // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
                    //         color: {
                    //             type: 'radial',
                    //             x: 2,
                    //             y: 2,
                    //             r: 1,
                    //             colorStops: [{
                    //                 offset: 0, color: getColor() // 0% 处的颜色
                    //             }, {
                    //                 offset: 1, color: getColor() // 100% 处的颜色
                    //             }],
                    //             globalCoord: false // 缺省为 false
                    //         }
                    //     }
                    // },
                    // z: 2,
                };
            })
        }
        ]
    };
    return (
        <Card className={styles.node_map_content} title={<FormattedMessage id="H_NODE"/>} loading={loading} bodyStyle={{height: '20rem'}}>
            <ReactEcharts
                option={option}
                style={{ width: '100%' }}
                className="react_for_echarts"
            />
        </Card>
    )

}
export default node_map