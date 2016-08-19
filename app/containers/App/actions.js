/*
 *
 * PlanSheet actions
 *
 */

import {
  LOAD_PROJECT,
  PROJECT_LOADED,
} from './constants';

export function loadProject() {
  return {
    type: LOAD_PROJECT,
  };
}

export function projectLoaded(projectId, projectName, actors, stages, planSheets) {
  return {
    type: PROJECT_LOADED,
    projectId,
    projectName,
    actors,
    stages,
    planSheets,
  };
}
