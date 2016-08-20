/*
 *
 * PlanSheet actions
 *
 */

import {
  ADD_SCENE,
  SCENE_ADDED,
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

export function sceneAdded(updatedActors, udpdatedStages, updatedScenes) {
  return {
    type: SCENE_ADDED,
    updatedActors,
    udpdatedStages,
    updatedScenes,
  };
}
