import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Customer } from './models/Customer';
import { Plant } from './models/Plant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  //General
  private readonly baseURL = "https://localhost:44397/";

  //Customer
  private readonly getCustomersURL = this.baseURL + "Customers/all";
  private readonly getCustomerPerIDURL = this.baseURL + "Customers/";
  private readonly getCustomerPlantsURL = this.baseURL + "Customers/id/plants";

  public getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.getCustomersURL);
  }

  public getCustomerByID(): Observable<Customer>{
    return this.http.get<Customer>(this.getCustomerPerIDURL);
  }

  public getCustomerPlants(): Observable<Plant[]>{
    return this.http.get<Plant[]>(this.getCustomerPlantsURL);
  }

}
