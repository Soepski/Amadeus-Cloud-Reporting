import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggingViewModel } from './models/Logging';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private readonly baseURL = "https://localhost:44397/";
  private readonly getAllIDs = this.baseURL + "Data/all";
  private readonly getLoggingURL = this.baseURL + "Data/get/";
  private readonly getDosingFinalsURL = this.baseURL + "Data/get/finals";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  public getIDs(): Observable<number[]>{
    return this.http.get<number[]>(this.getAllIDs);
  }

  public getLoggings(id: number): Observable<LoggingViewModel[]>{
    return this.http.get<LoggingViewModel[]>(this.getLoggingURL + id);
  }

  public getDosinFinals(): Observable<LoggingViewModel[]>{
    return this.http.get<LoggingViewModel[]>(this.getDosingFinalsURL);
  }
}
