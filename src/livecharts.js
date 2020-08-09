import React,{useEffect} from 'react';
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import io from 'socket.io-client';

const socket = io.connect("http://kaboom.rksv.net/watch");

socket.on('connect', () => {
  console.log(socket); 
});



function LiveCharts(props){
   
  let online = window.navigator.onLine;
  let offlineData = JSON.parse(localStorage.getItem('chart-data')) || {data: []}
  //console.log(offlineData)
   const chartState = {
      
    options: {
      chart: {
        id: 'ohlc-chart',
        type: 'candlestick',
        height: 350,
        redrawOnParentResize: true,
        animations:{
          enabled:false
        }
      },
      title: {
        text: 'Live OHLC Chart',
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
      }
    }
}
let formattedChartData = []

    useEffect(() => {
      socket.emit('sub',{state: true});
      socket.on('data', function(data,ack){
        console.log("got message with body ",data)
        
        let splitData = data.split(",")
       let formattedData = [parseInt(splitData[0]),parseFloat(splitData[1]),parseFloat(splitData[2]),parseFloat(splitData[3]),parseFloat(splitData[4])]
       formattedChartData.push(formattedData)
       
       ApexCharts.exec('ohlc-chart', 'appendData', [{
        data: formattedChartData
      }])
       const interval = setInterval(() => {
        if(ack){
          ack(1);
         }
      }, 2000);

        
      });
      socket.on('error', function(error){
        console.log(error)
      });
      
      return () => {
         //Clean up the subscription
         socket.emit('unsub',{state: false});
         //window.clearInterval(interval); 
         localStorage.setItem('chart-data',JSON.stringify({data: formattedChartData}))
      };
        
    },[]);

    

    return(
        <>
            <div>
            <Chart
                options={chartState.options}
                series={online ? [{data:[]}] : [offlineData]}
                type="candlestick"
                height={350}
                />
            </div>
        </>
    );
   
  
}

export default LiveCharts;
