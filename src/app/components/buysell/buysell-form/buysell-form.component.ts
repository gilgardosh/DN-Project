import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IForm {
  quantity: string;

}

@Component({
  selector: 'pm-buysell-form',
  templateUrl: './buysell-form.component.html',
  styleUrls: ['./buysell-form.component.css']
})
export class BuysellFormComponent implements OnInit {
  form: FormGroup;

  @Output() valueChanged = new EventEmitter<IForm>();
  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.form = new FormGroup({
      quantity: new FormControl('0', [
        Validators.required,
        Validators.minLength(1)
      ]),

    });
  }



  get isFormValid() {
    return this.form.valid && this.form.touched;
  }

  onSubmit() {
    console.log(this.form.value);
    this.valueChanged.emit(this.form.value);
  }
}
