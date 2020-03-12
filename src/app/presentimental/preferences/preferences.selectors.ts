import { createFeatureSelector } from '@ngrx/store';
import {
  PREFERENCES_FEATURE_KEY,
  PreferencesPartialState,
  State
} from './preferences.reducer';

export const selectPreferencesState = createFeatureSelector<
  PreferencesPartialState,
  State
>(PREFERENCES_FEATURE_KEY);
