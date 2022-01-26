import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormStore } from '../form-container.component';
@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css']
})

export class BaseFormComponent implements OnInit, OnDestroy {
  // osadz komponenty w dialogu
  @Input() startingForm?: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  public baseInfoForm?: FormGroup;
  constructor(private _fb: FormBuilder, private formStore: FormStore ) {}
  ngOnInit() {
    // if (this.startingForm) {
    //   this.baseInfoForm = this.startingForm;
    // } else {
    //   this.baseInfoForm = this._fb.group({
    //     base: 'base1',
    //     // ... continue with the other fields
    //   })
    // }
    // setTimeout(() => {
    //   this.subformInitialized.emit(this.baseInfoForm);
    // }, 0)
    // this.formStore.userForm
    this.formStore.userForm$.subscribe( data => {
      this.baseInfoForm = data
      // this.changeStep();
    }
  );
  }
  ngOnDestroy() {
  }
  doChangeStep(direction: any) {
    console.log('doChangeStep')
    this.changeStep.emit(direction);
  }
}