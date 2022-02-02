import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormStoreService } from '../../services/form-store.service';
@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css']
})

export class BaseFormComponent implements OnInit, OnDestroy {
  // osadz komponenty w dialogu
  @Input() startingForm?: FormGroup;
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  public baseInfoForm?: FormGroup;
  constructor(private _fb: FormBuilder, private formStore: FormStoreService ) {}
  ngOnInit() {
    this.formStore.userForm$.subscribe( data => {
      // console.log(data);
      this.baseInfoForm = data
    }
  );
  }
  ngOnDestroy() {
  }
  doChangeStep(direction: any) {
    // console.log('doChangeStep') 
    this.changeStep.emit(direction);
  }
}