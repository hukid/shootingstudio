/*
 *
 * SceneComposeForm reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  stage: '',
  environment: '',
  actors: [],
});

function sceneComposeFormReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default sceneComposeFormReducer;
