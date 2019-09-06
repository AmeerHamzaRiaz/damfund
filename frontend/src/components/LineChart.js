import React, { Component } from 'react';
import Chart from 'react-google-charts';

import '../styles/App.css';

class LineChart extends Component {
    render() {
        return (
            <div>
            <Chart
                width={'700px'}
                height={'400px'}
                chartType="Line"
                loader={<div>Loading Chart</div>}
                data={this.props.data}
                options={{
                    // curveType: 'function',
                    hAxis: {
                        title: 'Date',
                      },
                      vAxis: {
                        title: 'Amount',
                      },
                    legend: { position: 'none' },
                    animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true,
                      },
                      backgroundColor: 'red'
                }}
            />    
            </div>
        );
    }
}

export default LineChart;
