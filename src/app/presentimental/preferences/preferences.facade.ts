import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as PreferencesActions from './preferences.actions';
import * as fromPreferences from './preferences.reducer';
import * as PreferencesSelectors from './preferences.selectors';
import { Preferences } from './preferences';

@Injectable()
export class PreferencesFacade {
  preferences$ = this.store.pipe(
    select(PreferencesSelectors.selectPreferencesState)
  );

  constructor(private store: Store<fromPreferences.PreferencesPartialState>) {}

  updatePreferences(preferences: Preferences): void {
    this.store.dispatch(PreferencesActions.updatePreferences({ preferences }));
  }
}
