import { Component } from '@angular/core';
import { NavigationComponent } from './views/navigation/navigation.component';
import { ApiPlaygroundComponent } from './views/api-playground/api-playground.component';
import { OauthComponent } from './views/oauth/oauth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}
}
