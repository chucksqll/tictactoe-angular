import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LatestData {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {};
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  latestData: {} = {};
  baseUrl: string = 'http://data.fixer.io/api/';
  access_key = '56c9299343168ed9563d2f4927250a2e';
  latestUrl = 'http://data.fixer.io/api/latest?access_key=' + this.access_key + '&symbols=PLN,GBP,USD';

  constructor(private http: HttpClient) { }

  getLatestData() {
    this.http.get<LatestData>(this.latestUrl).subscribe(data => {
      this.latestData = data;
    })     
  }
}
