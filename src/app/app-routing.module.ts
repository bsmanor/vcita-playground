import { VcitaThankYouPageComponent } from './views/vcita-thank-you-page/vcita-thank-you-page.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ApiPlaygroundComponent } from './views/api-playground/api-playground.component';
import { OauthComponent } from './views/oauth/oauth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'oauth', component: OauthComponent},
  {path: 'api-playground', component: ApiPlaygroundComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'vcita-thank-you-page', component: VcitaThankYouPageComponent},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
