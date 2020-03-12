import { Injectable } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  setSavedState(state: any, localStorageKey: string) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }
}

export function storageMetaReducer<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  let onInit = true;
  return (reducer: ActionReducer<S, A>) => {
    return (state: S, action: A): S => {
      const nextState = reducer(state, action);

      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(localStorageKey);
        return merge(nextState, savedState);
      }

      const stateToSave = pick(nextState, saveKeys);
      storageService.setSavedState(stateToSave, localStorageKey);

      return nextState;
    };
  };
}
