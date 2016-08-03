/*
 *
 * PlanSheet actions
 *
 */

import {
  LOAD_PLANSHEET,
  PLANSHEET_LOADED,
} from './constants';

export function loadPlanSheet() {
  return {
    type: LOAD_PLANSHEET,
  };
}

export function planSheetLoaded(scenes) {
  return {
    type: PLANSHEET_LOADED,
    scenes,
  };
}
