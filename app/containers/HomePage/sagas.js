/*
 *
 * HomePage sagas
 *
 */

import { take, put, race, call } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PROJECT } from 'containers/App/constants';
import { projectLoaded } from 'containers/App/actions';

import { ADD_SCENE } from 'containers/SceneComposeForm/constants';

// Individual exports for testing
export function* projectSaga() {
  console.log('projectSaga started'); // eslint-disable-line no-console
  while (true) { // eslint-disable-line no-constant-condition
    const watcher = yield race({
      loadproject: take(LOAD_PROJECT),
      addScene: take(ADD_SCENE),
      //stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.loadproject) {
      console.log('projectSaga take LOAD_PROJECT'); // eslint-disable-line no-console

      const requestURL = 'api/project';
      const project = yield call(request, requestURL);

      if (project.data) {
        yield put(projectLoaded(project.data));
      } else {
        console.error('load data failed.'); // eslint-disable-line no-console
      }
    }

    if (watcher.addScene) {
      console.log('projectSaga take ADD_SCENE'); // eslint-disable-line no-console
    }
  }
}

// All sagas to be loaded
export default [
  projectSaga,
];
