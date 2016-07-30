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

export default selectPlanSheet;
export {
  selectPlanSheetDomain,
};
