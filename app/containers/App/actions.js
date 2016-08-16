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

export function projectLoaded(project) {
  return {
    type: PROJECT_LOADED,
    project,
  };
}
