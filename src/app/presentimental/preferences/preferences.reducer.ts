import { Action, createReducer, on } from '@ngrx/store';
import * as PreferencesActions from './preferences.actions';

export const PREFERENCES_FEATURE_KEY = 'preferences';

export interface State {
  showLogo: boolean;
  conferenceLogo: string;
  conferenceTitle: string;
  talkTitle: string;
  speakerName: string;
  slidesId: string;
  mainColor: string;
  withGradient: boolean;
  showDate: boolean;
}

export interface PreferencesPartialState {
  readonly [PREFERENCES_FEATURE_KEY]: State;
}

export const initialState: State = {
  showLogo: true,
  conferenceLogo: '/assets/netcentric_logo.svg',
  conferenceTitle: '',
  talkTitle: '',
  speakerName: '',
  slidesId: '',
  mainColor: '#331c93',
  withGradient: true,
  showDate: true,
};

const preferencesReducer = createReducer(
  initialState,

  on(PreferencesActions.updatePreferences, (state, { preferences }) => {
    return {
      ...state,
      ...preferences,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return preferencesReducer(state, action);
}
