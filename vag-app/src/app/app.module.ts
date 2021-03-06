import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RoutingComponent } from './routing/routing.component';
import { DecimalPipe } from '@angular/common';
import { PreferencesComponent } from './preferences/preferences.component';
import { OptionViewComponent } from './option-view/option-view.component';

import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule, MatCardModule, MatFormFieldModule } from '@angular/material';
import { BikePickupComponent } from './bike-pickup/bike-pickup.component';
import { RewardSummaryComponent } from './reward-summary/reward-summary.component';
import {RoutingService} from './services/routing/routing.service';
import {RoutingMockService} from './services/routing/routing-mock.service';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    DemoComponent,
    HeaderComponent,
    RoutingComponent,
    PreferencesComponent,
    OptionViewComponent,
    BikePickupComponent,
    RewardSummaryComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MglTimelineModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DecimalPipe,
    {provide: RoutingService, useClass: RoutingMockService}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
