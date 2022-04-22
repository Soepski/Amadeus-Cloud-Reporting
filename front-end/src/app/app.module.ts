import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DosingDetailsComponent } from './dosing-details/dosing-details.component';
import { DosingsGeneralComponent } from './dosings-general/dosings-general.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    DosingDetailsComponent,
    DosingsGeneralComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    NgbModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
