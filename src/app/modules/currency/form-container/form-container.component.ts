import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormStoreService } from '../services/form-store.service';

type Step = 'baseInfo' | 'dateInfo' | 'ratesInfo';
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  public userForm: FormGroup = {} as FormGroup;
  @Output() addItemFromForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private formStore: FormStoreService) {}
  currentStep: Step = 'baseInfo';
  ngOnInit() {
    this.formStore.currentStep$.subscribe( data => {
        this.currentStep = data
      }
    );
  }
  subformInitialized(name: string, group: FormGroup) {
    console.log(name, group);
    console.log(typeof(group));
    this.userForm.setControl(name, group);
  }
  changeStep(currentStep: string, direction: 'forward' | 'back') { // ustawic na wartosci liczbowe, zeby bylo latwiej
    switch(currentStep) {
      case 'baseInfoStep':
        if (direction === 'forward') {
          this.formStore.currencyStep = 'ratesInfo';
        }
        break;
      case 'ratesInfoStep':
        if (direction === 'forward') {
          this.formStore.currencyStep = 'dateInfo';
        }
        if (direction === 'back') {
          this.formStore.currencyStep = 'baseInfo';
        }
          break;
      case 'dateInfoStep':
        if (direction === 'back') {
          this.formStore.currencyStep = 'ratesInfo';
        }
        break;
    }
  }
  submitForm() {
    const formValues = this.userForm.value;
    console.log(this.formStore.userForm.controls.baseInfo.value);
    this.addItemFromForm.emit(this.formStore.userForm); // to change
    // this.userForm.reset();
    // submit the form with a service
  }

}
