import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }
  //General
  private readonly baseURL = "http://10.14.0.236:5600/";

  //Data
  private readonly getAllIDs = this.baseURL + "Plant/all";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  public getPlantIDs(): Observable<number[]>{
    return this.http.get<number[]>(this.getAllIDs);
  }

}
