import {Component} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface IMessage {
  sender: string;
  body: string;
  timestamp: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: Observable<IMessage[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('msg').valueChanges().pipe(map((items: IMessage[]) => {
      items.sort((a, b) => {
        if (a.sender < b.sender) {
          return -1;
        }
        if (a.sender > b.sender) {
          return 1;
        }
        return 0;
      });
      return items;
    }));
  }
}
