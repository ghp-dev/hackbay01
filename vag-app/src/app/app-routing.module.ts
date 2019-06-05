import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingComponent } from './routing/routing.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  {
    component: RoutingComponent,
    path: 'routing/:id',
  },
  {
    component: PreferencesComponent,
    path: 'preferences'
  },
  {
    component: TimelineComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
