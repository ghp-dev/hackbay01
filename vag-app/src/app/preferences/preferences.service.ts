import { Injectable } from '@angular/core';
import { Preferences } from '../shared/preferences.entity';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private static StorageKey = 'VAG_APP_PREFERENCES';

  constructor() { }

  store(preferences: Preferences) {
    window.localStorage.setItem(PreferencesService.StorageKey, JSON.stringify(preferences));
  }

  load(): Preferences {
    if (environment.presentation) {
      let pref = new Preferences();
      pref.work = "Rothenburger Straße, Nürnberg";
      pref.home ="Kachletstraße, Nürnberg";
      return pref;
    }
    const preferencesString = window.localStorage.getItem(PreferencesService.StorageKey);
    if (preferencesString) {
      return JSON.parse(preferencesString);
    }

    return new Preferences();
  }
}
