import { Component, OnInit } from '@angular/core';
import { RoutingService } from './services/routing/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'vag-app';

  constructor(private routingService: RoutingService) { }


   ngOnInit(): void { }
}

