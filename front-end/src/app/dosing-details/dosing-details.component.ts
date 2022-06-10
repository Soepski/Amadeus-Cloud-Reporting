import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PlantService } from '../plant.service';
import { ArticleService } from '../article.service';
import { Logging } from '../models/Logging';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CheckboxItem } from '../models/CheckboxItem';
import { Article } from '../models/Article';
import { Proportioningrecord } from '../models/Proportioningrecord';
import { DatePipe } from '@angular/common';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dosing-details',
  templateUrl: './dosing-details.component.html',
  styleUrls: ['./dosing-details.component.scss']
})
export class DosingDetailsComponent implements OnInit {

  loggings?: Logging[] | null;
  records?: Proportioningrecord[];
  articles: Article[] = [];
  loggingProps: String[] = [];
  selectedItems: String[] = [];
  checkboxList: Array<any> = [];
  typeofdosing!: string;
  setpoint!: number | null;
  setpointMin!: number | null;
  setpointMax!: number | null;
  accuracy!: number | null;
  dosedweight!: number | null;
  dosedweightMax!: number | null;
  dosedweightMin!: number | null;
  ChartOptions: any;
  //ids?: number[];
  plantids: number[] = [];
  selectedID!: number;
  selectedPlantID!: number;
  selectedArticle!: Article | null;
  closeResult = '';
  // filterCustomer!: string;
  // filterPlant!: string;
  // filterArticle!: string;
  filterDateFrom!: NgbDateStruct | null;
  filterDateUntil!: NgbDateStruct | null;
  timeArray?: Array<number>;
  searchExpr: string = "";
  searchMode: Array<any> = [];
  total!: number;
  time: number = 0;
  selectUndefinedOptionValue:any;
  totalPropCount!: number;

  constructor(private dataService: DataService, 
    private plantService: PlantService, 
    private articleService: ArticleService, 
    private modalService: NgbModal,
    private datePipe: DatePipe) { }

  
  public async ngOnInit(){
    //Get all customers
    //await this.getIDs();
    //Get all plant IDS
    await this.getPlantIDs();
    //Get all articles
    await this.getArticlesByProportioningRecords();
    //Get first 100 records
    await this.getProportioningrecords();
  }

  public async onChangeID(id: number) {
    this.selectedID = id;
    this.getLoading();
    this.loggings = null;
    this.getLogging(this.selectedID);
  }


  public async onChangeArticle() {
    if(this.filterDateFrom == null || this.filterDateUntil == null){
      this.getProportioningRecordsByArticle();
      this.selectUndefinedOptionValue = "";
      this.loggings = null;
      this.resetChart();  
    }
    if(this.filterDateFrom != null && this.filterDateUntil != null){
      this.getProportioningRecordsByArticleAndDate();
      this.selectUndefinedOptionValue = "";
      this.loggings = null;
      this.resetChart();  
    }
      
  }

  public onChangeDate(){
    this.getProportioningRecordsByArticleAndDate();
    this.selectUndefinedOptionValue = "";
    this.loggings = null;
    this.resetChart();   
  }
  
  deleteArticleFilter(){
    this.selectedArticle = null;
    this.getProportioningrecords();
    this.selectUndefinedOptionValue = "";
    this.loggings = null;
    this.resetChart();   
  }

  deleteDateFromFilter(){
    this.filterDateFrom = null;
    this.getProportioningRecordsByArticle();
    this.selectUndefinedOptionValue = "";
    this.loggings = null;
    this.resetChart();   
  }

  deleteDateUntilFilter(){
    this.filterDateUntil = null;
    this.getProportioningRecordsByArticle();
    this.selectUndefinedOptionValue = "";
    this.loggings = null;
    this.resetChart();   
  }


  public checkboxClick(prop: CheckboxItem){

    if(prop.isChecked == false){
      this.selectedItems.push(prop.name);
      this.setOptions();
      this.checkboxListUpdate();
    }
    if(prop.isChecked == true){
      this.selectedItems.forEach((element,index)=>{
        if(element == prop.name) this.selectedItems.splice(index,1);
     });
     this.setOptions();
     this.checkboxListUpdate();
    }

  }

  public checkboxListUpdate(){
    this.checkboxList = [];
    for (var i = 0; i < this.loggingProps.length; i++) {

      var ismatch = false; // we haven't found it yet

      for (var j = 0; j < this.selectedItems.length; j++) {

        if (this.loggingProps[i] == this.selectedItems[j]) {
          // we have found this.loggingsProps[i]] in this.selectedItems, so we can stop searching
          ismatch = true;
          const checkitem: CheckboxItem = {name: this.loggingProps[i], isChecked: true};
          this.checkboxList.push(checkitem);
          break;
        }//End if
        // and ismatch will remain false
      }
      // add this.loggingsProps[i] to newArray only if we didn't find a match.
      if (!ismatch) {
        const checkitem: CheckboxItem = {name: this.loggingProps[i], isChecked: false};
        this.checkboxList.push(checkitem);
      } //End if
    }
  }

  // public getIDs(): void{
  //   this.dataService.getIDs().subscribe(ids => this.ids = ids.sort());
  // }


  public getPlantIDs(): void{
    this.plantService.getPlantIDs().subscribe(ids => this.plantids = ids.sort());
  }

  public getArticles():void{
    this.articleService.getArticles().subscribe(articles => this.articles = articles);
  }

  public getArticlesByPlantID(id: number): void{
    this.articleService.getArticlesByPlantID(id).subscribe(articles => this.articles = articles);
  }

  public getArticlesByProportioningRecords(): void{
    this.articleService.getArticlesByProportioningRecords().subscribe(articles => this.articles = articles);
  }

  public getTotalProportioningCount(): void{
    this.dataService.getTotalProportioningCount().subscribe(count => this.totalPropCount = count);
  }

  public getTotalProportioningCountByArticle(article: string): void{
    this.dataService.getTotalProportioningCountByArticle(article).subscribe(count => this.totalPropCount = count);
  }

  public getProportioningrecords(): void{
    this.dataService.getProportioningrecords().subscribe(records => {
      this.getTotalProportioningCount();
      records.forEach(a => {
        this.dataService.getDosingTypePerID(a.proportioningrecordDbid).subscribe(result => {
          a.actualamount = Math.round(a.actualamount * 1000) / 1000;
          if(result == 1){a.dosingtype = "Dosing";}
          else{a.dosingtype = "Stuffing/filling"}
        });
    });
      this.records = records
    });
    
  }

  public async getProportioningRecordsByArticle(): Promise<any>{
    this.dataService.getProportioningRecordsByArticle(this.selectedArticle!.toString()).subscribe(records => {
        this.getTotalProportioningCountByArticle(this.selectedArticle!.toString());        
        records.forEach(a => {
            this.dataService.getDosingTypePerID(a.proportioningrecordDbid).subscribe(result => {
              a.actualamount = Math.round(a.actualamount * 1000) / 1000;
              if(result == 1){a.dosingtype = "Dosing";}
              else{a.dosingtype = "Stuffing/filling"}
            });
        });
        this.records = records;
      });
  }

  public async getProportioningRecordsByArticleAndDate(): Promise<any>{
    let datefrom = new Date(this.filterDateFrom!.year, this.filterDateFrom!.month - 1, this.filterDateFrom!.day)
    let dateuntil = new Date(this.filterDateUntil!.year, this.filterDateUntil!.month - 1, this.filterDateUntil!.day)
    this.dataService.getProportioningRecordsByArticleAndDate(this.selectedArticle!.toString(), this.datePipe.transform(datefrom)!, this.datePipe.transform(dateuntil)!).subscribe(records => { 
      this.getTotalProportioningCountByArticle(this.selectedArticle!.toString());  
      records.forEach(a => {
        a.actualamount = Math.round(a.actualamount * 1000) / 1000;
          this.dataService.getDosingTypePerID(a.proportioningrecordDbid).subscribe(result => {
            if(result == 1){a.dosingtype = "Dosing";}
            else{a.dosingtype = "Stuffing/filling"}
          });
      });
      this.records = records;
        
      });
  }

  public async getLogging(id: number): Promise<any>{
    this.dataService.getLoggings(this.selectedID).subscribe(result => 
      {this.loggings = result; 
        this.loggingProps = Object.keys(this.loggings[0]); 
        this.selectedItems = ["c3DesiredSlidePosition", "ifNetWeight1"];
        //  "c1ExpectedFlow", "ifNetWeight10", "c1SlideOpening", "c1Productactivationfactor"];
        if(this.loggings[0].ifTypeofdosing == 1){this.typeofdosing = "Dosing";}
        else{this.typeofdosing = "Stuffing/filling";}
        this.setpoint = this.loggings[0].ifSetpoint;
        this.accuracy = this.loggings[0].ifAccuracy;
        let tempweight =  this.loggings[this.loggings.length - 1].ifDosedWeight;
        this.dosedweight = Math.round(tempweight! * 1000) / 1000;
        this.calculateTimeToSecond();
        this.mapDosingTime();
        this.calculateMargins();
        this.checkboxListUpdate();
        this.setOptions();
      });
  }

  public calculateMargins(){
    this.setpointMax = this.setpoint! + ((this.setpoint! / 100)  * this.accuracy!);
    this.setpointMin = this.setpoint! - ((this.setpoint! / 100)* this.accuracy!);
  }

  public calculateTimeToSecond(): number{
    //7: micro, 6: seconden, 5: minuten, 4: uren, 3: dagen, 2: maanden, 1: jaren
    let microseconds = this.loggings![this.loggings!.length - 1].ifDosedTime7;
    let seconds = this.loggings![this.loggings!.length - 1].ifDosedTime6;
    let minutes = this.loggings![this.loggings!.length - 1].ifDosedTime5;
    let hours = this.loggings![this.loggings!.length - 1].ifDosedTime4;
    let days = this.loggings![this.loggings!.length - 1].ifDosedTime3;
    let months = this.loggings![this.loggings!.length - 1].ifDosedTime2;
    let years = this.loggings![this.loggings!.length - 1].ifDosedTime1;
    
    let covertedtoseconds = (microseconds!/1000000) + seconds! + (minutes!*60) + (hours!*3600) + (days!*86400) + (months!*2629743) + (years!*31556926);
    this.time = covertedtoseconds;

    return covertedtoseconds;
  }

  public mapDosingTime(){
    let total = this.calculateTimeToSecond();
    let steps = this.loggings!.length - 1;
    let increase = total / steps;

    this.timeArray = [0];

    for(var i = 0; i <= steps; i++){
      this.timeArray.push(Math.round((this.timeArray[this.timeArray.length - 1] + increase) * 100) / 100);
    }
  }

  setGraphTitle(): string{
    let title = "";

    this.selectedItems.forEach(element => {
      if(this.selectedItems.indexOf(element.toString()) == this.selectedItems.length - 1){
        title = title += element;
      }
      else{
        title = title += element + ", ";
      }
    });

    return title;
  }

  setLegendToColor(selectedItem: String, color: string): string{

    let tempColor = "";

    if(selectedItem === undefined){
      return "#FFFFFF00"
    }
    else{
      return color
    } 
  }

  setOptions() {
    this.ChartOptions = {
      title: {
        text: this.setGraphTitle(),
        left: 'center',
        padding: [
          30,  // up
          0, // right
          0,  // down
          0, // left
      ]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#505765'
          }
        }
      },
      color: [
        '#0088FE', //0
        '#8BC500', //1
        '#FF5714', //2
        '#E9F100', //3
        '#001021', //4
        '#EE80A6', //5
        '#CE6C47', //6
        '#D3C1D2', //7
        '#1C0221', //8
      ],
      grid: {
        top: "30%",
        right: "15%",
        left: "10%"
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
      legend: {
        data: [this.selectedItems[0], this.selectedItems[1], this.selectedItems[2], 
        this.selectedItems[3], this.selectedItems[4], this.selectedItems[5]],
        left: 115,
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
        type: 'category',
        // data: this.loggings.map(c => c.ifDosedTime7)
        data: this.timeArray
      },
      yAxis: [
        {
          type: 'value',
          name: this.selectedItems[0], //Desiredslide//////////////////////////////////
          nameRotate: 45, 
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[0], '#0088FE')  
              

            }
          }
        },
        {
          type: 'value',
          name: this.selectedItems[1], //netweight10////////////////////////////////////
          position: 'right',
          nameRotate: 45, 
          alignTicks: true,
          offset: 30,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[1], '#8BC500') 
            }
          }
        },
        {
          type: 'value',
          name: this.selectedItems[2], //c1ExpectedFlow/////////////////////////////////////////
          position: 'left',
          nameRotate: -45, 
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[2], '#FF5714') 
            }
          }
        },
        {
          type: 'value',
          name: this.selectedItems[3], //ifNetWeight6///////////////////////////////////////////////
          position: 'left',
          nameRotate: -45, 
          alignTicks: true,
          offset: 30,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[3], '#E9F100')
            }
          }
        },
        {
          type: 'value',
          name: this.selectedItems[4], //ifNetWeight3///////////////////////////////////////////////
          position: 'left',
          nameRotate: -45, 
          alignTicks: true,
          offset: 60,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[4], '#001021')
            }
          }
        },
        {
          type: 'value',
          name: this.selectedItems[5], //ifNetWeight3///////////////////////////////////////////////
          position: 'right',
          nameRotate: 45, 
          alignTicks: true,
          offset: 60,
          axisLine: {
            show: true,
            lineStyle: {
              color: this.setLegendToColor(this.selectedItems[5], '#EE80A6')
            }
          }
        }
      ],
      series: [
        {
          name: this.selectedItems[0], //DesiredSlidePosition 1
          type: 'line',
          showSymbol: false,
          lineStyle: {
            width: 1
          },
          
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[0] as keyof Logging])
        },
        {
          name: this.selectedItems[1], //NetWeight 10
          type: 'line',
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[1] as keyof Logging])
        },
        {
          name: this.selectedItems[2], //c1ExpectedFlow
          type: 'line',
          showSymbol: false,
          yAxisIndex: 2,
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[2] as keyof Logging])
        },
        {
          name: this.selectedItems[3], //Iets 4
          type: 'line',
          showSymbol: false,
          yAxisIndex: 3,
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[3] as keyof Logging])
        },
        {
          name: this.selectedItems[4], //Iets 5
          type: 'line',
          showSymbol: false,
          yAxisIndex: 4,
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[4] as keyof Logging])
        },
        {
          name: this.selectedItems[5], //Iets 6
          type: 'line',
          showSymbol: false,
          yAxisIndex: 5,
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings!.map(c => c[this.selectedItems[5] as keyof Logging])
        }
      ]
    };
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

  resetChart(){
    this.ChartOptions = {};
  }
}
