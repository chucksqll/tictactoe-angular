import { Component, EventEmitter, OnInit } from "@angular/core";
import { Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormStore } from "../form-container.component";

@Component({
  selector: "app-date-form",
  templateUrl: "./date-form.component.html",
  styleUrls: ["./date-form.component.css"],
})
export class DateFormComponent implements OnInit {
  // osadz komponenty w dialogu
  @Input() startingForm?: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public dateInfoForm?: FormGroup;
  constructor(private _fb: FormBuilder, private formStore: FormStore) {}
  ngOnInit() {
    // if (this.startingForm) {
    //   this.dateInfoForm = this.startingForm;
    // } else {
    //   this.dateInfoForm = this._fb.group({
    //     date: "",
    //     // ... continue with the other fields
    //   });
    // }
    // setTimeout(() => {
    //   this.subformInitialized.emit(this.dateInfoForm);
    // }, 0)
    this.formStore.userForm$.subscribe( data => {
      this.dateInfoForm = data
      // this.changeStep();
    })
  }
  doChangeStep(direction: any) {
    this.changeStep.emit(direction);
  }
  submitForms(){
    this.submitForm.emit(true);
  }
}
