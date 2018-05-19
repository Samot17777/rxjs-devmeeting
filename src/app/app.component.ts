import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { Timestamp } from '@firebase/firestore-types';

export interface IMessage {
  sender: string;
  body: string;
  timestamp: Timestamp;
  date?: Date;
  img?: string;
  yt?: string;
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

export const transform = (items: IMessage[]): IMessage[] => {
  return items.map((item) => {
    item.date = new Date(item.timestamp.seconds);
    return item;
  });
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public db: AngularFirestore;
  itemsCollection: AngularFirestoreCollection<IMessage>;
  messages: Observable<IMessage[]>;
  check = (item: IMessage): Promise<DocumentReference> => this.itemsCollection.add(item);

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<IMessage>('msg');
    this.messages = this.itemsCollection.valueChanges().pipe(map(transform), map(sortItems));
  }
}
