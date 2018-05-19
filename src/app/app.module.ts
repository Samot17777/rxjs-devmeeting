import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {MsgformComponent} from './msgform/msgform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatCardModule, MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilermsgPipe } from './filermsg.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MsgformComponent,
    SidebarComponent,
    FilermsgPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    MatSidenavModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
