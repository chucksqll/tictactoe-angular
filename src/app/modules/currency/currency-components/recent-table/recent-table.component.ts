import { Component, OnInit } from '@angular/core';

import { LatestData, LatestDatas } from './recent-table-data';
import { ExchangeRatesService } from '../../services/exchange-rates.service';


@Component({
  selector: 'app-recent-table',
  templateUrl: './recent-table.component.html',
  styleUrls: ['./recent-table.component.css']
})
export class RecentTableComponent implements OnInit {

  tableData: LatestData[];
  rates: string[];
  constructor(public exchangeRatesService: ExchangeRatesService) {
    this.tableData = LatestDatas;
    this.rates = this.getRates();
  }
  ngOnInit(): void {
  }
  addItemFromForm(formInput: any){

    let rates = {} as any;
    for (let item of formInput.value.ratesInfo) {
      let rateName = item['rate'];
      let rateValue = item['rateValue'];
      rates[rateName] = parseFloat(rateValue);
    }
    let item: LatestData = {
      success: true,
      base: formInput.value.baseInfo,
      date: formInput.value.dateInfo,
      rates: rates,
      timestamp: 1000,
      sortedRatesValues: [],
    }
    this.tableData.push(item)
    this.rates = this.getRates();
  }
  getRates(): string[]{
    let array = [];
    for(let i in this.tableData){
      let rates = this.tableData[i].rates as any;
      for(let key of Object.keys(rates)){
        array.push(key);
      }
    }
    array = Array.from(new Set(array));
    this.unpackRatesAndFill(array);
    return array.sort(function(a,b) {
      return a[0].localeCompare(b[0]); // ascending
    });
  }
  unpackRatesAndFill(ratesNames: any) {
    for(let i in this.tableData){
      let rates = this.tableData[i].rates as any;
      for(let key of Object.keys(ratesNames)){
        if(!(ratesNames[key] in rates)){
          rates[ratesNames[key]] = 0;
        }
      }
      let array_rates = Object.entries(rates);
      array_rates.sort(function(a,b) {
        return a[0].localeCompare(b[0]);
      });

      this.tableData[i].sortedRatesValues  = array_rates.map(function(x) {
        return x[1];
      }) as any;
    }
  } 
  
}
