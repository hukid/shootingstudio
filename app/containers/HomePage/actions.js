/*
 *
 * PlanSheet actions
 *
 */

import {
  ADD_SCENE,
} from './constants';

export function addScene(projectId, planSheetId, stage, environment, actors) {
  return {
    type: ADD_SCENE,
    projectId,
    planSheetId,
    stage,
    environment,
    actors,
  };
}
