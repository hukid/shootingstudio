/*
 *
 * PlanSheet reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_PLANSHEET,
  PLANSHEET_LOADED,
} from './constants';

const initialState = fromJS({
  name: 'MyFirstProject',
  scenes: [],
});

function planSheetReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLANSHEET:
      return state.set('scenes', fromJS([]));
    case PLANSHEET_LOADED:
      // console.log(JSON.stringify(action.scenes));
      return state.set('scenes', fromJS(action.scenes));
    default:
      return state;
  }
}

export default planSheetReducer;
