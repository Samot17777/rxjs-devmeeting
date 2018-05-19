import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('msg').valueChanges().pipe(tap(console.log));
  }
}
