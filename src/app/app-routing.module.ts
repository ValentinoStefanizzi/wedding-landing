import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { GiftPageComponent } from './gift-page/gift-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'info', component: InfoPageComponent },
  { path: 'gift', component: GiftPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
