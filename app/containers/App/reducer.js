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

const initialState = fromJS({
  _id: '',
  name: '',
  actors: false,
  stages: false,
  planSheets: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      return state
        .set('_id', '')
        .set('name', '')
        .set('actors', false)
        .set('stages', false)
        .set('planSheets', false);
    case PROJECT_LOADED:
      // console.log(JSON.stringify(action.scenes));
      return state
        .set('_id', action.project._id) // eslint-disable-line no-underscore-dangle
        .set('name', action.project.name)
        .set('actors', fromJS(action.project.actors))
        .set('stages', fromJS(action.project.stages))
        .set('planSheets', fromJS(action.project.planSheets));
    default:
      return state;
  }
}

export default appReducer;
