/*
 *
 * PlanSheet reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PROJECT,
  PROJECT_LOADED,
} from './constants';

// This app state only represent one project
const initialState = fromJS({
  projectId: '',
  name: '',
  actors: false,
  stages: false,
  planSheets: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      return state
        .set('projectId', '')
        .set('name', '')
        .set('actors', false)
        .set('stages', false)
        .set('planSheets', false);
    case PROJECT_LOADED:
      // console.log(JSON.stringify(action.scenes));
      return state
        .set('projectId', action.projectId)
        .set('name', action.projectName)
        .set('actors', action.actors)
        .set('stages', action.stages)
        .set('planSheets', action.planSheets);
    default:
      return state;
  }
}

export default appReducer;
