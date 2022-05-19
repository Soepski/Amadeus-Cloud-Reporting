import { Component, OnInit, Type } from '@angular/core';
import { Logging } from '../models/Logging';
import { Proportioningrecord } from '../models/Proportioningrecord';
import { DataService } from '../data.service';
import * as echarts from 'echarts';

import ecStat from 'echarts-stat';

type EChartsOption = echarts.EChartsOption;

//See https://github.com/ecomfe/echarts-stat
echarts.registerTransform(ecStat.transform.histogram);





@Component({
  selector: 'app-dosings-general',
  templateUrl: './dosings-general.component.html',
  styleUrls: ['./dosings-general.component.scss']
})
export class DosingsGeneralComponent implements OnInit {

  loggings: Logging[] = [];
  ChartOptions: any;
  totaldosings: number = 0;
  totaldosedweight: number = 0;
  totalcorrectdosings: number = 0;
  averagetime: number = 0;
  proportioningrecords: Proportioningrecord[] = [];
  



  constructor(private dataService: DataService) {}

  public async ngOnInit(){
    this.getLoading(); 
    this.getProportioningrecords();
    this.dataService.getDosinFinals().subscribe(loggings => 
      {
        this.loggings = loggings;
        this.getStats();
        
      });
    var chartDom = document.getElementById('container')!;
    var myChart = echarts.init(chartDom);
  }

  public getProportioningrecords(): void {
    this.dataService.getProportioningrecords().subscribe(records => 
      {
        this.proportioningrecords = records;
        console.log(this.proportioningrecords);
        this.setOptionsBarHistogram();
        this.getStats();
      });
  }
  public getStats(): void{
    //total dosings
    this.totaldosings = this.loggings.length;

    //total dosed weight
    let totaldosedweight: number = 0;
    this.loggings.forEach(function (arrayitem)
    {
      totaldosedweight! = totaldosedweight! + arrayitem.ifDosedWeight!
    })
    this.totaldosedweight = Math.round(totaldosedweight);

    //total correct dosings
    let correctdosings: number = 0;
    this.loggings.forEach(function (arrayitem){
      if (arrayitem.ifDosedWeight! >= arrayitem.ifSetpoint! - ((arrayitem.ifSetpoint! / 100)  * arrayitem.ifAccuracy!)
          && arrayitem.ifDosedWeight! <= arrayitem.ifSetpoint! + ((arrayitem.ifSetpoint! / 100)  * arrayitem.ifAccuracy!))
      {
          correctdosings = correctdosings + 1
      }
    })
    this.totalcorrectdosings = correctdosings;

    //average dosing time
    let totalmicroseconds: number = 0;
    this.loggings.forEach(function (arrayitem){
      let microseconds = arrayitem.ifDosedTime7! + (arrayitem.ifDosedTime6! * 1000000) + ((arrayitem.ifDosedTime5! * 60) * 1000000);
      totalmicroseconds = totalmicroseconds + microseconds;
    })
    let miliseconds: number = totalmicroseconds / 1000;
  }

  public getTimeOfDosing(prop: Proportioningrecord): number{
    var date1 = new Date(prop.startTime);
    var date2 = new Date(prop.endTime);
    
    var Time = date2.getTime() - date1.getTime();
    
    return Time/1000;
  }

  public getDosingValues(): Array<Number[]>{
    let array: Array<Number[]> = [];
    this.loggings.forEach(function (arrayitem){
      array.push([arrayitem.ifSetpoint!,
                  arrayitem.ifDosedWeight!,
                  arrayitem.ifSetpoint! - ((arrayitem.ifSetpoint! / 100)  * arrayitem.ifAccuracy!),
                  arrayitem.ifSetpoint! + ((arrayitem.ifSetpoint! / 100)  * arrayitem.ifAccuracy!)
                  ])
    })

    return array;
  }

  public setOptionsBoxplot() {
    this.ChartOptions = {
      title: {
        text: "Boxplot dosing general",
        left: 'center'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          show: true,
          realtime: true
        },
        {
          type: 'inside',
          realtime: true,
          start: 65,
          end: 85
        }
      ],
      xAxis: {
        data: this.loggings.map(c => c.proportioningDbid)
      },
      yAxis: {},
      series: [
        {
          type: 'candlestick',
          data: this.getDosingValues()
        }
      ]
    };
  }

  public getLoading(){
    this.ChartOptions = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80
              },
              style: {
                fill: '#5470c6'
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn'
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut'
                  }
                ]
              }
            }))
          }
        ]
      }
    };
  }

  public setOptionsBarHistogram(){
    this.ChartOptions = {
      dataset: [
        {
          source: [
            [this.getTimeOfDosing(this.proportioningrecords[0]), this.proportioningrecords[0].actualamount],
            [this.getTimeOfDosing(this.proportioningrecords[1]), this.proportioningrecords[1].actualamount],
          ]
        },
        {
          transform: {
            type: 'ecStat:histogram',
            config: {}
          }
        },
        {
          transform: {
            type: 'ecStat:histogram',
            // print: true,
            config: { dimensions: [1] }
          }
        }
      ],
      tooltip: {},
      grid: [
        {
          top: '50%',
          right: '50%'
        },
        {
          bottom: '52%',
          right: '50%'
        },
        {
          top: '50%',
          left: '52%'
        }
      ],
      xAxis: [
        {
          scale: true,
          gridIndex: 0
        },
        {
          type: 'category',
          scale: true,
          axisTick: { show: false },
          axisLabel: { show: false },
          axisLine: { show: false },
          gridIndex: 1
        },
        {
          scale: true,
          gridIndex: 2
        }
      ],
      yAxis: [
        {
          gridIndex: 0
        },
        {
          gridIndex: 1
        },
        {
          type: 'category',
          axisTick: { show: false },
          axisLabel: { show: false },
          axisLine: { show: false },
          gridIndex: 2
        }
      ],
      series: [
        {
          name: 'origianl scatter',
          type: 'scatter',
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: { tooltip: [0, 1] },
          datasetIndex: 0
        },
        {
          name: 'histogram',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          barWidth: '99.3%',
          label: {
            show: true,
            position: 'top'
          },
          encode: { x: 0, y: 1, itemName: 4 },
          datasetIndex: 1
        },
        {
          name: 'histogram',
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          barWidth: '99.3%',
          label: {
            show: true,
            position: 'right'
          },
          encode: { x: 1, y: 0, itemName: 4 },
          datasetIndex: 2
        }
      ]
    };
    
  }
  
  
}
