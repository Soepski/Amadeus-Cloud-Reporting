import { Component, OnInit, Type } from '@angular/core';
import { Logging } from '../models/Logging';
import { Proportioningrecord } from '../models/Proportioningrecord';
import { DataService } from '../data.service';
import * as echarts from 'echarts';
import { ArticleService } from '../article.service';
import { Article } from '../models/Article';
import { DatePipe } from '@angular/common';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  articles: Article[] = [];
  proportioningrecords: Proportioningrecord[] = [];
  selectedArticle!: Article;
  filterArticle!: string;
  filterDateFrom!: NgbDateStruct;
  filterDateUntil!: NgbDateStruct;
  selectUndefinedOptionValue:any;
  closeResult = '';
  

  // prettier-ignore
  dimensions = [
    'name', 'Weight', 'Weight alarm', 'Weight alarm min', 'Weight alarm max', 'Weight min', 'Weight max'
  ];

  constructor(private dataService: DataService, 
    private articleService: ArticleService, 
    private datePipe: DatePipe,
    private modalService: NgbModal) {}

  public async ngOnInit(){
    this.getLoading(); 
    await this.getArticlesByProportioningRecords();
    this.dataService.getDosinFinals().subscribe(loggings => 
      {
        this.loggings = loggings;
        this.getStatsFromLoggings();
        this.getScatterArray();
        
      });
    var chartDom = document.getElementById('container')!;
    var myChart = echarts.init(chartDom);
  }

  public async onChangeArticle() {
    if(this.filterDateFrom == null || this.filterDateUntil == null){
      this.getProportioningRecordsByArticle();
      this.selectUndefinedOptionValue = "";
      this.resetChart();  
    }
    if(this.filterDateFrom != null && this.filterDateUntil != null){
      this.getProportioningRecordsByArticleAndDate();
      this.selectUndefinedOptionValue = "";
      this.resetChart();  
    }
      
  }

  public onChangeDate(){
    this.getProportioningRecordsByArticleAndDate();
    this.selectUndefinedOptionValue = "";
    this.resetChart();   
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
        this.getStatsFromLoggings();
      });
  }

  public getArticlesByProportioningRecords(): void{
    this.articleService.getArticlesByProportioningRecords().subscribe(articles => this.articles = articles);
  }

  public async getProportioningRecordsByArticle(): Promise<any>{
    this.dataService.getProportioningRecordsByArticle(this.selectedArticle.toString()).subscribe(records => 
      {        
        records.forEach(a => {
            this.dataService.getDosingTypePerID(a.proportioningrecordDbid).subscribe(result => {
              console.log(result);
              if(result == 1){a.dosingtype = "Dosing";}
              else{a.dosingtype = "Stuffing/filling"}
            });
        });
        this.proportioningrecords = records;
        console.log(this.proportioningrecords);
      });
  }

  public async getProportioningRecordsByArticleAndDate(): Promise<any>{
    let datefrom = new Date(this.filterDateFrom.year, this.filterDateFrom.month - 1, this.filterDateFrom.day)
    let dateuntil = new Date(this.filterDateUntil.year, this.filterDateUntil.month - 1, this.filterDateUntil.day)
    console.log(this.datePipe.transform(datefrom), this.datePipe.transform(dateuntil));
    this.dataService.getProportioningRecordsByArticleAndDate(this.selectedArticle.toString(), this.datePipe.transform(datefrom)!, this.datePipe.transform(dateuntil)!).subscribe(records => 
      { 
        records.forEach(a => {
          this.dataService.getDosingTypePerID(a.proportioningrecordDbid).subscribe(result => {
            console.log(result);
            if(result == 1){a.dosingtype = "Dosing";}
            else{a.dosingtype = "Stuffing/filling"}
          });
      });
      this.proportioningrecords = records;
        
      });
  }

  public getStatsFromLoggings(): void{
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

  public getStatsFromProportiongingrecords(): void{
    //total dosings
    this.totaldosings = this.proportioningrecords.length;

    //total dosed weight
    let totaldosedweight: number = 0;
    this.proportioningrecords.forEach(function (arrayitem)
    {
      totaldosedweight! = totaldosedweight! + arrayitem.actualamount!
    })
    this.totaldosedweight = Math.round(totaldosedweight);

    //total correct dosings
    let correctdosings: number = 0;
    this.proportioningrecords.forEach(function (arrayitem){
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
      //Gewicht
      //Gewicht
      //Tolerantie alarm min
      //Tolerantie alarm max
      //Gewicht min
      //Gewicht boven
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
      dataZoom: [
        {
          type: 'slider'
        },
        {
          type: 'inside'
        }
      ],
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
  
  resetChart(){
    this.ChartOptions = {};
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
