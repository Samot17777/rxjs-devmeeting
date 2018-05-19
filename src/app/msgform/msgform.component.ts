import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-msgform',
  templateUrl: './msgform.component.html',
  styleUrls: ['./msgform.component.css']
})
export class MsgformComponent {

  public form: FormGroup;
  public submitButtonText = 'send me';


  @Output() formSubmit = new EventEmitter();
  formSubmitSubject = new Subject();

  constructor(private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      sender: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.formSubmitSubject
      .pipe(
        filter(() => this.form.valid),
        map(() => this.form.value)
      )
      .subscribe(this.formSubmit);
  }


}
