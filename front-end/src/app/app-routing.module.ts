import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DosingDetailsComponent } from './dosing-details/dosing-details.component';
import { DosingsGeneralComponent } from './dosings-general/dosings-general.component';

const routes: Routes = [
  { path: '', component: DosingDetailsComponent, pathMatch: 'full'},
  { path: 'details', component: DosingDetailsComponent},
  { path: 'general', component: DosingsGeneralComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
