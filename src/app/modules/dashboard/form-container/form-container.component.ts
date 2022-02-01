import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = 'baseInfo' | 'dateInfo' | 'ratesInfo';
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  public userForm: FormGroup = {} as FormGroup;
  @Output() addItemFromForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private _fb: FormBuilder, private formStore: FormStore) {}
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
@Injectable({
  providedIn: 'root'
})
export class FormStore {
  constructor(private _fb: FormBuilder){}
  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('baseInfo');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable(); 
  get currencyStep(): Step {
    const servicesDict = this.currentStepBs.getValue();
    return servicesDict;
  }
  set currencyStep(val: Step) {
      this.currentStepBs.next(val);
  }

  private userFormBs: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(
    this._fb.group({
        baseInfo: null,
        ratesInfo: null,
        dateInfo: null
    }));
  public userForm$: Observable<FormGroup> = this.userFormBs.asObservable(); 
  get userForm(): FormGroup {
    return this.userFormBs.getValue();
  }
  set userForm(val: FormGroup) {
      this.userFormBs.next(val);
  }
  
}