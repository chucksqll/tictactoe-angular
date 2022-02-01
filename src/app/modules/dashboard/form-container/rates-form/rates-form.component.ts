import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { FormStore } from '../form-container.component';

@Component({
  selector: 'app-rates-form',
  templateUrl: './rates-form.component.html',
  styleUrls: ['./rates-form.component.css']
})
export class RatesFormComponent implements OnInit {

  constructor(private _fb: FormBuilder, private formStore: FormStore) {}
  public ratesInfoForm?: FormGroup;
  // @Input() startingForm?: FormGroup;
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
    this.formStore.userForm$.subscribe( data => {
      // this.ratesInfoForm = data
      console.log(data);
      this.ratesInfoForm = this._fb.group({
        // rate: 'PLN',
        // rateValue: '4.5'
        rates: this._fb.array([
          // {
          //   rate: '',
          //   rateValue: '',
          // }
        ]),
        // ... continue with the other fields
      })
      this.addInputs();
    })
  }
  doChangeStep(direction: any) {
    console.log(this.ratesInfoForm)
    this.changeStep.emit(direction);
  }
  addInputs(){
    console.log('hejka')
    if(this.ratesInfoForm){
      const rates = this.ratesInfoForm.controls.rates as FormArray;
      rates.push(this._fb.group({
        rate: '',
        rateValue: '',
      }));
    }
  }

}
// export class DateFormComponent implements OnInit {
//   // osadz komponenty w dialogu
//   @Input() startingForm?: FormGroup;
//   @Output() subformInitialized: EventEmitter<FormGroup> =
//     new EventEmitter<FormGroup>();
//   @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
//   @Output() submitForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  
//   public dateInfoForm?: FormGroup;
//   constructor(private _fb: FormBuilder, private formStore: FormStore) {}
//   ngOnInit() {
//     this.formStore.userForm$.subscribe( data => {
//       this.dateInfoForm = data
//     })
//   }
//   doChangeStep(direction: any) {
//     this.changeStep.emit(direction);
//   }
//   submitForms(){
//     this.submitForm.emit(true);
//   }
// }
