/*
 *
 * PlanSheet actions
 *
 */

import {
  ADD_SCENE,
} from './constants';

export function addScene(stage, environment, actors) {
  return {
    type: ADD_SCENE,
    stage,
    environment,
    actors,
  };
}
