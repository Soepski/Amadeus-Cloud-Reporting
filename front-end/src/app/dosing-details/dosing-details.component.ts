import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PlantService } from '../plant.service';
import { Logging } from '../models/Logging';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CheckboxItem } from '../models/CheckboxItem';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSelectBoxModule, DxListModule, DxTemplateModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-dosing-details',
  templateUrl: './dosing-details.component.html',
  styleUrls: ['./dosing-details.component.scss']
})
export class DosingDetailsComponent implements OnInit {

  loggings: Logging[] = [];
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
  ids: number[] = [];
  plantids: number[] = [];
  selectedID!: number;
  selectedPlantID!: number;
  closeResult = '';
  filterCustomer!: string;
  filterPlant!: string;
  filterArticle!: string;
  filterDateFrom!: Date;
  filterDateUntil!: Date;
  timeArray?: Array<number>;
  searchExpr: string = "";
  searchMode: Array<any> = [];

 
  constructor(private dataService: DataService, private plantService: PlantService, private modalService: NgbModal) { }

  
  public async ngOnInit(){
    //Get all customers
    await this.getIDs();
    //All plant IDS
    await this.getPlantIDs();   
  }

  // public onChangeCustomer(event?: any){
  //   if(this.filterCustomer != null && this.filterPlant == null && this.filterDateFrom == null && this.filterDateUntil == null)
  //   {
  //     //Query get customer information
  //   }
  //   this.filterCustomer = event;
  // }

  public onChangePlant(event?: any){
    this.filterPlant = event;
    if(this.filterPlant != null && this.filterDateFrom == null && this.filterDateUntil == null)
    {
      //Get dosings from customer and plant
    }
  }

  public onChangeArticle(event?: any){
    if(true)
    {
      //Get all dosings with this article
    }
  }

  public onChangeDate(event?: any){
    if(true)
    {
      //Get all dosings between this date
    }
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

    console.log(this.selectedItems);
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

  public async onChangeID() {
    this.getLoading();
    this.loggings = [];
    this.getLogging(this.selectedID);
  }

  onChangePlantID(){
    //get plant
  }

  public getIDs(): void{
    this.dataService.getIDs().subscribe(ids => this.ids = ids.sort());
  }

  public getPlantIDs(): void{
    this.plantService.getPlantIDs().subscribe(ids => this.plantids = ids.sort());
  }

  public async getLogging(id: number): Promise<any>{
    this.dataService.getLoggings(this.selectedID).subscribe(result => 
      {this.loggings = result; 
        this.loggingProps = Object.keys(this.loggings[0]); 
        this.selectedItems = ["c3DesiredSlidePosition", "ifNetWeight6"];
        if(this.loggings[0].ifTypeofdosing == 1){this.typeofdosing = "Dosing";}
        else{this.typeofdosing = "Stuffing/filling";}
        this.setpoint = this.loggings[0].ifSetpoint;
        this.accuracy = this.loggings[0].ifAccuracy;
        this.dosedweight = this.loggings[this.loggings.length - 1].ifDosedWeight;
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
    let microseconds = this.loggings[this.loggings.length - 1].ifDosedTime7;
    let seconds = this.loggings[this.loggings.length - 1].ifDosedTime6;
    let minutes = this.loggings[this.loggings.length - 1].ifDosedTime5;
    let hours = this.loggings[this.loggings.length - 1].ifDosedTime4;
    let days = this.loggings[this.loggings.length - 1].ifDosedTime3;
    let months = this.loggings[this.loggings.length - 1].ifDosedTime2;
    let years = this.loggings[this.loggings.length - 1].ifDosedTime1;
    
    let covertedtoseconds = (microseconds!/1000000) + seconds! + (minutes!*60) + (hours!*3600) + (days!*86400) + (months!*2629743) + (years!*31556926);

    return covertedtoseconds;
  }

  public mapDosingTime(){
    let total = this.calculateTimeToSecond();
    let steps = this.loggings.length - 1;
    let increase = total / steps;

    console.log(total);
    console.log(steps);
    console.log(increase);

    this.timeArray = [0];

    for(var i = 0; i <= steps; i++){
      this.timeArray.push(Math.round((this.timeArray[this.timeArray.length - 1] + increase) * 100) / 100);
    }
    console.log(this.timeArray);
  }

  setOptions() {
    this.ChartOptions = {
      title: {
        text: this.selectedItems[0] + " and " + this.selectedItems[1],
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
      legend: {
        data: [this.selectedItems[0], this.selectedItems[1]],
        left: 115
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
          name: this.selectedItems[0],
          type: 'value'
        },
        {
          name: this.selectedItems[1],
          type: 'value',
          inverse: false
        }
      ],
      series: [
        {
          name: this.selectedItems[0], //DesiredSlidePosition
          type: 'line',
          areaStyle: {},
          lineStyle: {
            width: 1
          },
          
          // prettier-ignore
          data: this.loggings.map(c => c[this.selectedItems[0] as keyof Logging])
        },
        {
          name: this.selectedItems[1], //NetWeight
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {},
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings.map(c => c[this.selectedItems[1] as keyof Logging])
        },
        {
          name: this.selectedItems[2], //Iets
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {},
          lineStyle: {
            width: 1
          },
          // prettier-ignore
          data: this.loggings.map(c => c[this.selectedItems[2] as keyof Logging])
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
}
