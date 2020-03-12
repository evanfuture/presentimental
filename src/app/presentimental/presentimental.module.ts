import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentimentalComponent } from './presentimental.component';
import { YoshikoInputComponent } from './components/yoshiko-input/yoshiko-input.component';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { PresentimentalRoutingModule } from './presentimental-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { ValutisFileInputComponent } from './components/valutis-file-input/valutis-file-input.component';
import { ThemingService } from './services/theming.service';
import { StoreModule } from '@ngrx/store';

import { PreferencesFacade } from './preferences/preferences.facade';
import * as fromPreferences from './preferences/preferences.reducer';
import {
  PREFERENCES_CONFIG_TOKEN,
  PREFERENCES_LOCAL_STORAGE_KEY,
  PREFERENCES_STORAGE_KEYS
} from './preferences/preferences.tokens';
import {
  LocalStorageService,
  storageMetaReducer
} from './services/local-storage.service';

export function getPreferencesConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  return {
    metaReducers: [
      storageMetaReducer(saveKeys, localStorageKey, storageService)
    ]
  };
}

const getStateKeys = (state: {}) => Object.keys(state);

@NgModule({
  declarations: [
    PresentimentalComponent,
    YoshikoInputComponent,
    ModalBaseComponent,
    ValutisFileInputComponent
  ],
  imports: [
    CommonModule,
    PresentimentalRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
    StoreModule.forFeature(
      fromPreferences.PREFERENCES_FEATURE_KEY,
      fromPreferences.reducer,
      PREFERENCES_CONFIG_TOKEN
    )
  ],
  providers: [
    ThemingService,
    LocalStorageService,
    PreferencesFacade,
    {
      provide: PREFERENCES_LOCAL_STORAGE_KEY,
      useValue: '__presentimental_preferences_storage__'
    },
    {
      provide: PREFERENCES_STORAGE_KEYS,
      useValue: getStateKeys(fromPreferences.initialState)
    },
    {
      provide: PREFERENCES_CONFIG_TOKEN,
      deps: [
        PREFERENCES_STORAGE_KEYS,
        PREFERENCES_LOCAL_STORAGE_KEY,
        LocalStorageService
      ],
      useFactory: getPreferencesConfig
    }
  ]
})
export class PresentimentalModule {}
