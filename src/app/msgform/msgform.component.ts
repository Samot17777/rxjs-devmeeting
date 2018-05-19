import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-msgform',
  templateUrl: './msgform.component.html',
  styleUrls: ['./msgform.component.css']
})
export class MsgformComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      sender: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
