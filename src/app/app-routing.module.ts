import { ApiPlaygroundComponent } from './views/api-playground/api-playground.component';
import { OauthComponent } from './views/oauth/oauth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component:OauthComponent},
  {path: 'oauth', component:OauthComponent},
  {path: 'api-playground', component:ApiPlaygroundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
