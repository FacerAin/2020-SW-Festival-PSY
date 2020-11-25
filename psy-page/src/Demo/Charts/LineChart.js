import React from 'react';
import NVD3Chart from 'react-nvd3';

function getDatum() {
    let sin = []

    return [
        {
            values: sin,
            key: '집중도 (%)',
            color: '#A389D4'
        }
    ];
}

//'#04a9f5'
// '#1de9b6',

class LineChart extends React.Component {

    render() {
        const data = getDatum();
        return (
            <div>
                {
                    React.createElement(NVD3Chart, {
                        xAxis: {
                            tickFormat: function(d){ return d; },
                            axisLabel: 'Time (m)'
                        },
                        yAxis: {
                            tickFormat: function(d) {return parseFloat(d).toFixed(2); }
                        },
                        type:'lineChart',
                        datum: data,
                        x: 'x',
                        y: 'y',
                        height: 150,
                        renderEnd: function(){
                            console.log('renderEnd');
                        }
                    })
                }
            </div>
        )
    }
}

export default LineChart;