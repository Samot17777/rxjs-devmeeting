import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface IMessage {
  sender: string;
  body: string;
  timestamp: number;
}

export const sort = (a: IMessage, b: IMessage): number => {
  if (a.sender < b.sender) {
    return -1;
  }
  if (a.sender > b.sender) {
    return 1;
  }
  return 0;
};

export const sortItems = (items: IMessage[]): IMessage[] => {
  items.sort(sort);
  return items;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public db: AngularFirestore;
  items: Observable<IMessage[]>;
  check = (item: IMessage) => this.itemsCollection.add(item);
  itemsCollection: AngularFirestoreCollection<IMessage>;

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<IMessage>('msg');
    this.items = this.itemsCollection.valueChanges().pipe(map(sortItems));
  }
}
