import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = 'baseInfo' | 'dateInfo';
@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  // private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('baseInfo');
  // public currentStep$: Observable<Step> = this.currentStepBs.asObservable(); 
  // store do tego lub zmienna do wywalenia zeby uproscic, zwykla zmienna wystarczy
  public userForm: FormGroup = {} as FormGroup;
  @Output() addItemFromForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  constructor(private _fb: FormBuilder, private formStore: FormStore) {}
  currentStep: Step = 'baseInfo';
  ngOnInit() {
    // this.userForm = this._fb.group({
    //   baseInfo: null,
    //   dateInfo: null
    // });
    this.formStore.currentStep$.subscribe( data => {
        this.currentStep = data
        // this.changeStep();
      }
    );
  }
  subformInitialized(name: string, group: FormGroup) {
    console.log(name, group);
    console.log(typeof(group));
    this.userForm.setControl(name, group);
  }
  // zrob store np formStore, i subskrybuje go w componencie currentStep$
  changeStep(currentStep: string, direction: 'forward' | 'back') { // ustawic na wartosci liczbowe, zeby bylo latwiej
    console.log("changestep")
    console.log(currentStep, direction); 
    switch(currentStep) {
      case 'baseInfoStep':
        if (direction === 'forward') {
          // this.formStore.currentStepBs.next('dateInfo');
          this.formStore.currencyStep = 'dateInfo';
        }
        break;
      case 'dateInfoStep':
        if (direction === 'back') {
          // this.currentStepBs.next('baseInfo');
          this.formStore.currencyStep = 'baseInfo';
        }
        break;
    }
  }
  submitForm() {
    // console.log("submitForm!!!!!")
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