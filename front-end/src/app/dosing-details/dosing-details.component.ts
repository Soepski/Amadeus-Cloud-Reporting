import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LoggingViewModel } from '../models/Logging';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dosing-details',
  templateUrl: './dosing-details.component.html',
  styleUrls: ['./dosing-details.component.scss']
})
export class DosingDetailsComponent implements OnInit {

  loggings: LoggingViewModel[] = [];
  loggingProps: String[] = [];
  selectedItems: string[] = [];
  dropdownSettings = {};
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
  selectedID!: number;
  closeResult = '';
  filterCustomer?: string;
  filterPlant?: string;
  filterDateFrom?: Date;
  filterDateUntil?: Date;

 
  constructor(private dataService: DataService, private modalService: NgbModal) { }

  
  public async ngOnInit(){
    await this.getIDs();

    this.dropdownSettings= {
      maxHeight: 300,
      enableCheckAll: false,
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  public async onChangeID() {
    this.getLoading();
    this.loggings = [];
    this.getLogging(this.selectedID);
  }

  public getIDs(): void{
    this.dataService.getIDs().subscribe(ids => this.ids = ids.sort());
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
        this.calculateMargins();
        this.setOptions();
      });
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
    this.setOptions();
  }
  onSelectAll(items: any) {
    console.log(this.selectedItems);
    this.setOptions();
  }
  onItemDeSelect(item: any) {
    console.log(this.selectedItems);
    this.setOptions();
  }

  calculateMargins(){
    this.setpointMax = this.setpoint! + ((this.setpoint! / 100)  * this.accuracy!);
    this.setpointMin = this.setpoint! - ((this.setpoint! / 100)* this.accuracy!);
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
        data: this.loggings.map(c => c.ifDosedTime7)
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
          data: this.loggings.map(c => c[this.selectedItems[0] as keyof LoggingViewModel])
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
          data: this.loggings.map(c => c[this.selectedItems[1] as keyof LoggingViewModel])
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
          data: this.loggings.map(c => c[this.selectedItems[2] as keyof LoggingViewModel])
        }
      ]
    };
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
