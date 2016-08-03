import { createSelector } from 'reselect';

/**
 * Direct selector to the planSheet state domain
 */
const selectPlanSheetDomain = () => state => state.get('planSheet');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlanSheet
 */

const selectPlanSheet = () => createSelector(
  selectPlanSheetDomain(),
  (substate) => substate.toJS()
);

const selectScenes = () => createSelector(
  selectPlanSheetDomain(),
  (planSheet) => (planSheet.get('scenes').toJS ? planSheet.get('scenes').toJS() : planSheet.get('scenes'))
);

const selectName = () => createSelector(
  selectPlanSheetDomain(),
  (planSheet) => planSheet.get('name')
);

export {
  selectPlanSheetDomain,
  selectPlanSheet,
  selectScenes,
  selectName,
};
