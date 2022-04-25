import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Logging } from './models/Logging';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  //General
  private readonly baseURL = "https://localhost:44397/";

  //Data
  private readonly getAllIDs = this.baseURL + "Data/all";
  private readonly getLoggingURL = this.baseURL + "Data/get/";
  private readonly getDosingFinalsURL = this.baseURL + "Data/get/finals";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  public getIDs(): Observable<number[]>{
    return this.http.get<number[]>(this.getAllIDs);
  }

  public getLoggings(id: number): Observable<Logging[]>{
    return this.http.get<Logging[]>(this.getLoggingURL + id);
  }

  public getDosinFinals(): Observable<Logging[]>{
    return this.http.get<Logging[]>(this.getDosingFinalsURL);
  }

}
