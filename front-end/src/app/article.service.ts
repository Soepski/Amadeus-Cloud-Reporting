import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Article } from './models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  //General
  private readonly baseURL = "https://localhost:44397/";

  //Data
  private readonly getArticlesURL = this.baseURL + "Article/all";
  private readonly getArticlesByPlantIDURL = this.baseURL + "Article/";
  private readonly getArticlesByProportioningRecordsURL = this.baseURL + "Article/all/records";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  public getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.getArticlesURL);
  }

  public getArticlesByPlantID(id: number): Observable<Article[]>{
    return this.http.get<Article[]>(this.getArticlesByPlantIDURL + id);
  }

  public getArticlesByProportioningRecords(): Observable<Article[]>{
    return this.http.get<Article[]>(this.getArticlesByProportioningRecordsURL);
  }

}