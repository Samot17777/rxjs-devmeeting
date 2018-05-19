import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {IMessage} from '../app.component';

@Component({
  selector: 'app-msgform',
  templateUrl: './msgform.component.html',
  styleUrls: ['./msgform.component.css']
})
export class MsgformComponent {

  public form: FormGroup;
  public submitButtonText = 'send me';


  @Output() formSubmit: EventEmitter<IMessage> = new EventEmitter();
  formSubmitSubject: Subject<IMessage> = new Subject();

  constructor(private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      sender: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.formSubmitSubject
      .pipe(
        filter((): boolean => this.form.valid),
        map((): IMessage => ({...this.form.value, timestamp: new Date()})),
      )
      .subscribe(this.formSubmit);
  }


}
