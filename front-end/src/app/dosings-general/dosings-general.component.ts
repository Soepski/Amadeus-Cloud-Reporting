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

  // prettier-ignore
  dimensions = [
    'name', 'Weight', 'Weight alarm', 'Weight alarm min', 'Weight alarm max', 'Weight min', 'Weight max'
  ];
  // prettier-ignore
  // data = [
  //   ['Blouse "Blue Viola"', //Dosing ID
  //   101.88, //X-as Center //Gewicht
  //   99.75, //Y-as Center  //Gewicht
  //   76.75, //X-as Links   //Tolerantie alarm min
  //   116.75, //X-as rechts //Tolerantie alarm max
  //   69.88, //Y-as onder   //Gewicht min
  //   119.88], //Y-as boven //Gewicht boven
  //   ['Dress "Daisy"', 155.8, 144.03, 126.03, 156.03, 129.8, 188.8],
  //   ['Trousers "Cutesy Classic"', 203.25, 173.56, 151.56, 187.56, 183.25, 249.25],
  //   ['Dress "Morning Dew"', 256, 120.5, 98.5, 136.5, 236, 279],
  //   ['Turtleneck "Dark Chocolate"', 408.89, 294.75, 276.75, 316.75, 385.89, 427.89],
  //   ['Jumper "Early Spring"', 427.36, 430.24, 407.24, 452.24, 399.36, 461.36],
  //   ['Breeches "Summer Mood"', 356, 135.5, 123.5, 151.5, 333, 387],
  //   ['Dress "Mauve Chamomile"', 406, 95.5, 73.5, 111.5, 366, 429],
  //   ['Dress "Flying Tits"', 527.36, 503.24, 488.24, 525.24, 485.36, 551.36],
  //   ['Dress "Singing Nightingales"', 587.36, 543.24, 518.24, 555.24, 559.36, 624.36],
  //   ['Sundress "Cloudy weather"', 603.36, 407.24, 392.24, 419.24, 581.36, 627.36],
  //   ['Sundress "East motives"', 633.36, 477.24, 445.24, 487.24, 594.36, 652.36],
  //   ['Sweater "Cold morning"', 517.36, 437.24, 416.24, 454.24, 488.36, 565.36],
  //   ['Trousers "Lavender Fields"', 443.36, 387.24, 370.24, 413.24, 412.36, 484.36],
  //   ['Jumper "Coffee with Milk"', 543.36, 307.24, 288.24, 317.24, 509.36, 574.36],
  //   ['Blouse "Blooming Cactus"', 790.36, 277.24, 254.24, 295.24, 764.36, 818.36],
  //   ['Sweater "Fluffy Comfort"', 790.34, 678.34, 660.34, 690.34, 762.34, 824.34]
  // ];

  constructor(private dataService: DataService) {}

  public async ngOnInit(){
    this.getLoading(); 
    this.getProportioningrecords();
    this.dataService.getDosinFinals().subscribe(loggings => 
      {
        this.loggings = loggings;
        this.getStats();
        this.getScatterArray();
        
      });
    var chartDom = document.getElementById('container')!;
    var myChart = echarts.init(chartDom);
  }

  public setDataSource(): Array<any>{
    let sourceArray: any[] = [];

    this.proportioningrecords.forEach(element => {
      let item: any[] = [];
      item.push(this.getTimeOfDosing(element));
      item.push(element.actualamount);

      sourceArray.push(item);
    });

    return sourceArray;
  }

  public getProportioningrecords(): void {
    this.dataService.getProportioningrecords().subscribe(records => 
      {
        this.proportioningrecords = records;
        //[time, amount], [time, amount]
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

  public getScatterArray(): Array<Array<any>>{
    let arrayComplete: Array<Array<any>> = [];

    this.proportioningrecords.forEach(element => {
      //let arrayItem: Array<any> = [];
      arrayComplete.push([element.articleName + " " + element.proportioningrecordDbid,
        element.actualamount,
        element.actualamount,
        element.requestedamount - ((element.requestedamount / 100)  * element.requiredalarmtolerance),
        element.requestedamount + ((element.requestedamount / 100)  * element.requiredalarmtolerance),
        element.requestedamount - ((element.requestedamount / 100)  * element.requiredtolerance),
        element.requestedamount + ((element.requestedamount / 100)  * element.requiredtolerance)
      ])
      
    });
    console.log(arrayComplete);
    return arrayComplete;
  }

  renderItem(
    params: echarts.CustomSeriesRenderItemParams,
    api: echarts.CustomSeriesRenderItemAPI
  ): echarts.CustomSeriesRenderItemReturn {
    const group: echarts.CustomSeriesRenderItemReturn = {
      type: 'group',
      children: []
    };
    let coordDims = ['x', 'y'];
  
    for (let baseDimIdx = 0; baseDimIdx < 2; baseDimIdx++) {
      let otherDimIdx = 1 - baseDimIdx;
      let encode = params.encode;
      let baseValue = api.value(encode[coordDims[baseDimIdx]][0]);
      let param = [];
      param[baseDimIdx] = baseValue;
      param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][1]);
      let highPoint = api.coord(param);
      param[otherDimIdx] = api.value(encode[coordDims[otherDimIdx]][2]);
      let lowPoint = api.coord(param);
      let halfWidth = 5;
  
      var style = api.style({
        stroke: api.visual('color') as string,
        fill: undefined
      });
  
      group.children.push(
        {
          type: 'line',
          transition: ['shape'],
          shape: makeShape(
            baseDimIdx,
            highPoint[baseDimIdx] - halfWidth,
            highPoint[otherDimIdx],
            highPoint[baseDimIdx] + halfWidth,
            highPoint[otherDimIdx]
          ),
          style: style
        },
        {
          type: 'line',
          transition: ['shape'],
          shape: makeShape(
            baseDimIdx,
            highPoint[baseDimIdx],
            highPoint[otherDimIdx],
            lowPoint[baseDimIdx],
            lowPoint[otherDimIdx]
          ),
          style: style
        },
        {
          type: 'line',
          transition: ['shape'],
          shape: makeShape(
            baseDimIdx,
            lowPoint[baseDimIdx] - halfWidth,
            lowPoint[otherDimIdx],
            lowPoint[baseDimIdx] + halfWidth,
            lowPoint[otherDimIdx]
          ),
          style: style
        }
      );
    }
  
    function makeShape(
      baseDimIdx: number,
      base1: number,
      value1: number,
      base2: number,
      value2: number
    ) {
      var shape: Record<string, number> = {};
      shape[coordDims[baseDimIdx] + '1'] = base1;
      shape[coordDims[1 - baseDimIdx] + '1'] = value1;
      shape[coordDims[baseDimIdx] + '2'] = base2;
      shape[coordDims[1 - baseDimIdx] + '2'] = value2;
      return shape;
    }
  
    return group;
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
          source: 
            //[time, amount]
            this.setDataSource()         
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
        // {
        //   name: 'origianl scatter',
        //   type: 'scatter',
        //   xAxisIndex: 0,
        //   yAxisIndex: 0,
        //   encode: { tooltip: [0, 1] },
        //   datasetIndex: 0
        // },
        {
          type: 'scatter',
          name: 'error',
          data: this.getScatterArray(),
          dimensions: this.dimensions,
          encode: {
            x: 2,
            y: 1,
            tooltip: [2, 1, 3, 4, 5, 6],
            itemName: 0
          },
          itemStyle: {
            color: '#77bef7'
          }
        },
        {
          type: 'custom',
          name: 'error',
          renderItem: this.renderItem,
          dimensions: this.dimensions,
          encode: {
            x: [2, 3, 4],
            y: [1, 5, 6],
            tooltip: [2, 1, 3, 4, 5, 6],
            itemName: 0
          },
          data: this.getScatterArray(),
          z: 100
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
