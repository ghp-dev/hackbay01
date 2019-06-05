import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingComponent } from './routing/routing.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { TimelineComponent } from './timeline/timeline.component';
import {OptionViewComponent} from './option-view/option-view.component';
import {BikePickupComponent} from './bike-pickup/bike-pickup.component';
import {RewardSummaryComponent} from './reward-summary/reward-summary.component';

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
    component: OptionViewComponent,
    path: 'option'
  }
  ,
  {
    component: BikePickupComponent,
    path: 'pickup'
  }
  ,
  {
    component: RewardSummaryComponent,
    path: 'reward-summary'
  }
  ,
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
