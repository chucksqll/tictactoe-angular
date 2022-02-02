import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

type Step = 'baseInfo' | 'dateInfo' | 'ratesInfo'; // gdzie to powinno siedziec?
@Injectable({
  providedIn: 'root'
})
export class FormStoreService {
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
