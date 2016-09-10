/*
 *
 * HomePage sagas
 *
 */

import { take, put, race, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import request from 'utils/request';
import { LOAD_PROJECT } from './constants';
import { projectLoaded } from './actions';

import { ADD_SCENE } from 'containers/HomePage/constants';

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
        // We should always convert the data in action
        const data = project.data;
        const projectId = data._id; // eslint-disable-line no-underscore-dangle
        const projectName = data.name;
        const actors = data.actors.reduce((map, object) => {
          map[object._id] = object; // eslint-disable-line
          return map;
        }, {});
        const stages = data.stages.reduce((map, object) => {
          map[object._id] = object; // eslint-disable-line
          return map;
        }, {});
        const planSheets = data.planSheets.reduce((map, object) => {
          map[object._id] = fromJS(object); // eslint-disable-line
          return map;
        }, {});

        yield put(projectLoaded(projectId, projectName, actors, stages, planSheets));
      } else {
        console.error(`load ${requestURL} failed.`); // eslint-disable-line no-console
      }
    }

    if (watcher.addScene) {
      console.log('projectSaga take ADD_SCENE'); // eslint-disable-line no-console
      const actionData = watcher.addScene;
      const requestURL = `api/scene/${actionData.projectId}/${actionData.planSheetId}`;
      const reuqestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stage: actionData.stage,
          environment: actionData.environment,
          actors: actionData.actors,
        }),
      };
      
      const updatedProject = yield call(request, requestURL, reuqestOptions);

      if (updatedProject.data) {
        // We should always convert the data in action
        const data = updatedProject.data;
        const projectId = data._id; // eslint-disable-line no-underscore-dangle
        const projectName = data.name;
        const actors = data.actors.reduce((map, object) => {
          map[object._id] = object; // eslint-disable-line
          return map;
        }, {});
        const stages = data.stages.reduce((map, object) => {
          map[object._id] = object; // eslint-disable-line
          return map;
        }, {});
        const planSheets = data.planSheets.reduce((map, object) => {
          map[object._id] = fromJS(object); // eslint-disable-line
          return map;
        }, {});

        yield put(projectLoaded(projectId, projectName, actors, stages, planSheets));
      } else {
        console.error(`load ${requestURL} failed.`); // eslint-disable-line no-console
      }
    }
  }
}
