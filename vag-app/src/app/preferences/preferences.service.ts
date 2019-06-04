import { Injectable } from '@angular/core';
import { Preferences } from '../shared/preferences.entity';

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
    const preferencesString = window.localStorage.getItem(PreferencesService.StorageKey);
    if (preferencesString) {
      return JSON.parse(preferencesString);
    }

    return new Preferences();
  }
}
