import { Component, OnInit } from '@angular/core';
import { Logging } from '../models/Logging';
import { Proportioningrecord } from '../models/Proportioningrecord';
import { DataService } from '../data.service';

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

  ngOnInit(): void {
    this.getLoading();
    this.dataService.getDosinFinals().subscribe(loggings => 
      {
        this.loggings = loggings;
        this.setOptionsBoxplot();
        this.getStats();
        this.getProportioningrecords();
        console.log(this.proportioningrecords);
        console.log(this.loggings);
      });
  }

  public getProportioningrecords(): void {
    this.dataService.getProportioningrecords().subscribe(records => this.proportioningrecords = records);
  }
  getStats(){
    //total dosings
    this.totaldosings = this.loggings.length;

    //total dosed weight
    let totaldosedweight: number = 0;
    this.loggings.forEach(function (arrayitem)
    {
      totaldosedweight! = totaldosedweight! + arrayitem.ifDosedWeight!
    })
    this.totaldosedweight = Math.floor(totaldosedweight);

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

  setOptionsBoxplot() {
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

  getLoading(){
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
}
