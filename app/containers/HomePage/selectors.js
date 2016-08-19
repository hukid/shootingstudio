/**
 * The App state selectors
 */

import { createSelector } from 'reselect';
import { selectProject } from 'containers/App/selectors';

const selectDefaultPlanSheet = () => createSelector(
  selectProject(),
  (project) => {
    const planSheets = project.get('planSheets');
    if (!planSheets) {
      return false;
    }

    return Object.values(planSheets)[0];
  }
);

export {
  selectDefaultPlanSheet,
};
