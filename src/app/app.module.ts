import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
// Angular native modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Firestore modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { ApiPlaygroundComponent } from './views/api-playground/api-playground.component';
import { OauthComponent } from './views/oauth/oauth.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { ClientsComponent } from './views/clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    OauthComponent,
    ApiPlaygroundComponent,
    NavigationComponent,
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
