import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { FormStoreService } from "../../services/form-store.service";

@Component({
  selector: "app-rates-form",
  templateUrl: "./rates-form.component.html",
  styleUrls: ["./rates-form.component.css"],
})
export class RatesFormComponent implements OnInit {
  constructor(private _fb: FormBuilder, private formStore: FormStoreService) {}
  public ratesInfoForm?: FormGroup;
  @Output() changeStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
    this.formStore.userForm$.subscribe((data) => {
      this.ratesInfoForm = data
      if (this.ratesInfoForm) {
        this.ratesInfoForm.controls.ratesInfo = this._fb.array([]);
        this.addInputs();
      }
    });
  }
  doChangeStep(direction: any) {
    this.changeStep.emit(direction);
  }
  addInputs() {
    if (this.ratesInfoForm) {
      const ratesInfo = this.ratesInfoForm.controls.ratesInfo as any;
      ratesInfo.push(
        this._fb.group({
          rate: "",
          rateValue: "",
        })
      );
    }
  }
}
interface CurrencyHeader {
  index: string;
  number: string;
}
