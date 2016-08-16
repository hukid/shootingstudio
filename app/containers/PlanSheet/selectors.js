import { createSelector } from 'reselect';
import { selectDefaultPlanSheet } from 'containers/App/selectors';

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
  // selectPlanSheetDomain(),
  selectDefaultPlanSheet(),
  (planSheet) => {
    if (planSheet) {
      return (planSheet.get('scenes').toJS ? planSheet.get('scenes').toJS() : planSheet.get('scenes'));
    }

    return [];
  }
);

const selectName = () => createSelector(
  // selectPlanSheetDomain(),
  selectDefaultPlanSheet(),
  (planSheet) => (planSheet) ? planSheet.get('name') : '' // eslint-disable-line no-confusing-arrow
);

export {
  selectPlanSheetDomain,
  selectPlanSheet,
  selectScenes,
  selectName,
};
