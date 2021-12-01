import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: AuthComponent, data: { isLoginMode: false } },
  { path: 'login', component: AuthComponent, data: { isLoginMode: true } },
  { path: 'faq', component: FaqComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'account', component: AccountComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
