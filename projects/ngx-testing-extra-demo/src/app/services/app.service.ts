import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CatFact {
  fact: string;
  length: number;
}

@Injectable({ providedIn: 'root' })
export class AppService {

  public constructor(
    private http: HttpClient,
  ) { }

  public CAT_FACT_URL: string = 'https://catfact.ninja/fact';

  public getCatFact(): Observable<HttpResponse<CatFact>> {
    return this.http.get<CatFact>(this.CAT_FACT_URL, { observe: 'response' });
  }
}
