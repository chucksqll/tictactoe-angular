import { Component } from '@angular/core';
@Component({
  templateUrl: 'card.component.html'
})
export class CardsComponent {
  access_key = '56c9299343168ed9563d2f4927250a2e';
  url = 'http://data.fixer.io/api/latest?access_key=' + this.access_key + '&PLN,GBP,USD';
//   {
//     "success": true,
//     "timestamp": 1643014444,
//     "base": "EUR",
//     "date": "2022-01-24",
//     "rates": {
//         "PLN": 4.528975
//     }  
// }
}
