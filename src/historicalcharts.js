import React,{ useState, useEffect } from 'react';
import "./style.css"
import Chart from "react-apexcharts";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

 
function HistoricalCharts(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [interval, setInterval] = React.useState(1);
    const [chartData, setChartData] = useState([{
        data: []
      }]);
    const [chartVolData, setChartVolData] = useState([{
        name: 'volume',
        data: []
      }]);  
    const chartState = {
          
        series: chartData,
        options: {
          chart: {
            type: 'candlestick',
            height: 350,
            redrawOnParentResize: true,
          },
          title: {
            text: 'Historical OHLC Chart',
            align: 'center'
          },
          plotOptions: {
            bar: {
                columnWidth: '25%'
            },  
            candlestick: {
              wick: {
                useFillColor: false,
              }
            }
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          },
        //   tooltip: {
        //     custom: function({series, seriesIndex, dataPointIndex, w}) {
        //         //console.log(chartVolData, seriesIndex, dataPointIndex, w)
        //       return '<div class="arrow_box">' +
        //         '<span> <b>Open :</b>' + w.globals.seriesCandleO[seriesIndex][dataPointIndex] + '</span><br />' +
        //         '<span> <b>High :</b>' + w.globals.seriesCandleH[seriesIndex][dataPointIndex] + '</span><br />' +
        //         '<span> <b>Low :</b>' + w.globals.seriesCandleL[seriesIndex][dataPointIndex] + '</span><br />' +
        //         '<span> <b>Close :</b>' + w.globals.seriesCandleC[seriesIndex][dataPointIndex] + '</span><br />' +
        //         '</div>'
        //     }
        //   }
        },
        seriesBar: chartVolData,
          optionsBar: {
            chart: {
              height: 160,
              type: 'bar',
              redrawOnParentResize: true,
              toolbar:{
                  show: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 0
            },
            xaxis: {
              type: 'datetime',
              axisBorder: {
                offsetX: 13
              },
              labels: {
                show: false
              }

            },
            yaxis: {
              labels: {
                show: true
              }
            }
          },
      
      
      
    }
    

    const interval_period = [1,2,3,4,5,6,7,8,9]

    const handleChange = (event) => {
        setInterval(event.target.value);
    };

  const handleData = (result) => {
    let formattedChartData = []
    let volumeData = []
    
    result.map(data => {
        let splitData = data.split(",")
        let formattedData = [parseInt(splitData[0]),parseFloat(splitData[1]),parseFloat(splitData[2]),parseFloat(splitData[3]),parseFloat(splitData[4])]
        formattedChartData.push(formattedData)
        volumeData.push([parseInt(splitData[0]),parseInt(splitData[5])])
    })
    //console.log(volumeData)
          
          setChartData([{
            data: formattedChartData
          }]);
          setChartVolData([{
            name: 'volume',
            data: volumeData
          }])
  };
    
    useEffect(() => {
        fetch("http://kaboom.rksv.net/api/historical?interval="+interval)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)  
          handleData(result)
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    },[interval]);

    
    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <>
                <div>
                <InputLabel id="interval-label">Interval</InputLabel>
                <Select
                labelId="interval-label"
                id="interval-select"
                value={interval}
                onChange={handleChange}
                >
                {
                    interval_period.map(period => {
                     return <MenuItem key={period} value={period}>{period}</MenuItem>
                    })
                }        
                
                </Select>
                </div>
            <div>
            <Chart
                options={chartState.options}
                series={chartData}
                type="candlestick"
                height={350}
                />
            </div>
            <div id="chart-bar">
                <Chart options={chartState.optionsBar} series={chartVolData} type="bar" height={160} />
            </div>    
          </>
        );
      }
   
  
}

export default HistoricalCharts
