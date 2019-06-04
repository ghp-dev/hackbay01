import { Component, OnInit, OnDestroy } from '@angular/core';
import { Preferences } from '../shared/preferences.entity';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  preferences: Preferences = new Preferences();

  constructor(private readonly preferencesService: PreferencesService) { }

  ngOnInit() {
    this.preferences = this.preferencesService.load();
  }

  ngOnDestroy() {
    this.preferencesService.store(this.preferences);
  }

}
