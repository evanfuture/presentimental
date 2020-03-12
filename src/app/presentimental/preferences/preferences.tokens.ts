import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';

import * as fromReducer from './preferences.reducer';

export const PREFERENCES_STORAGE_KEYS = new InjectionToken<
  keyof fromReducer.State[]
>('PresentimentalPreferencesStorageKeys');
export const PREFERENCES_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'PresentimentalPreferencesStorage'
);
export const PREFERENCES_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<fromReducer.State, any>
>('PresentimentalPreferencesConfigToken');
