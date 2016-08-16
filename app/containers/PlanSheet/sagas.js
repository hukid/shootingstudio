/*
 *
 * PlanSheet sagas
 *
 */

import { LOAD_PLANSHEET } from './constants';
import { planSheetLoaded } from './actions';
import { take, put, race, call } from 'redux-saga/effects';
import request from 'utils/request';

// Individual exports for testing
export function* planSheetSaga() {
  console.log('planSheetSaga started'); // eslint-disable-line no-console
  while (true) { // eslint-disable-line no-constant-condition
    const watcher = yield race({
      loadplanSheet: take(LOAD_PLANSHEET),
      //stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.loadplanSheet) {
      console.log('planSheetSaga take LOAD_PLANSHEET'); // eslint-disable-line no-console

      const requestURL = 'api/plansheet';
      const scenes = yield call(request, requestURL);

      if (scenes.data) {
        yield put(planSheetLoaded(scenes.data));
      } else {
        console.error('load data failed.'); // eslint-disable-line no-console
      }
    }
  }
}

// All sagas to be loaded
export default [
  planSheetSaga,
];
