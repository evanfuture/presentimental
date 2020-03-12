import { createAction, props } from '@ngrx/store';
import { Preferences } from './preferences';

export const updatePreferences = createAction(
  '[Preferences] Update Preferences',
  props<{ preferences: Preferences }>()
);
