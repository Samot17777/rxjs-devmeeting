import {Component} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from 'angularfire2/firestore';
import {concat, from, Observable} from 'rxjs';
import {concatMap, map, scan, take, tap} from 'rxjs/operators';
import {DocumentReference, Timestamp} from '@firebase/firestore-types';
import {DomSanitizer} from '@angular/platform-browser';

export interface IMessage {
  sender: string;
  body: string;
  timestamp: Timestamp;
  id: string;
  date?: Date;
  link?: Date;
  img?: string;
  yt?: string;
}

export const getYTid = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11,11}).*/;
  const match = url.match(regExp);
  if (match && match.length >= 2) {
    return 'https://www.youtube.com/embed/' + match[2];
  }

  return '';
};

export const sort = (a: IMessage, b: IMessage): number => {
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  return 0;
};

export const sortItems = (items: IMessage[]): IMessage[] => {
  items.sort(sort);
  return items;
};

export const transform = (item: IMessage) => {
    item.date = new Date(item.timestamp.toDate());
    item.yt = getYTid(item.yt || '');
    return item;
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
  add = (item: IMessage): Promise<DocumentReference> => this.itemsCollection.add(item);
  remove = (product: IMessage) => this.itemsCollection.doc(product.id).delete();

  constructor(public sanitizer: DomSanitizer, db: AngularFirestore) {
    this.sanitizer = sanitizer;
    this.itemsCollection = db.collection<IMessage>('msg');
    this.messages = concat(
      this.itemsCollection.stateChanges()
    ).pipe(
      map(x => x.map(a => a.payload.doc).map(a => ({...a.data(), id: a.id}))),
      tap(console.log),
      map(sortItems),
      concatMap((x) => from(x)),
      map(transform),
      scan((x, y) => x.concat([y]), [])
    );
  }
}
