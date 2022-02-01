import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { LatestData, LatestDatas } from './recent-table-data';
import { ExchangeRatesService } from '../../../shared/services/exchange-rate-service/exchange-rates.service';

@Component({
  selector: 'app-recent-table',
  templateUrl: './recent-table.component.html',
  styleUrls: ['./recent-table.component.css']
})
export class RecentTableComponent implements OnInit {

  tableData: LatestData[];
  rates: string[];
  constructor(private formBuilder: FormBuilder, public exchangeRatesService: ExchangeRatesService) {
    this.tableData = LatestDatas;
    this.rates = this.getRates();
  }
  // add form per every item
  // and use behavioursubject and observer
  // checkoutForm = this.formBuilder.group({
  //   success: '',
  //   base: '',
  //   date: '',
  //   rates: {}
  // });
  // onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
  //   let formInput = this.checkoutForm.value;
  //   let item: LatestData = {
  //     success: formInput.success,
  //     base: formInput.base,
  //     date: formInput.date,
  //     rates: formInput.rates,
  //     timestamp: 1000
  //   }
  //   this.tableData.push(item)
  //   console.warn('Your order has been submitted', this.checkoutForm.value);
  //   this.checkoutForm.reset();
  // }
  ngOnInit(): void {
  }
  addItemFromForm(formInput: any){
    console.log(formInput);
    // console.log(this.)
    let item: LatestData = {
      success: true,
      base: formInput.value.baseInfo,
      date: formInput.value.dateInfo,
      rates: {},
      timestamp: 1000,
      sortedRatesValues: [],
    }
    this.tableData.push(item)
    // console.log('add item from form.', item);
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
    return array;
  }
  unpackRatesAndFill(ratesNames: any) {
    for(let i in this.tableData){
      let rates = this.tableData[i].rates as any;
      for(let key of Object.keys(ratesNames)){
        if(!(ratesNames[key] in rates)){
          rates[ratesNames[key]] = 0;
        }
      }
      this.tableData[i].sortedRatesValues = Array.from(Object.values(rates)) as string[];
    }
  }
  
}
