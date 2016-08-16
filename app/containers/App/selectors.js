/**
 * The App state selectors
 */

import { createSelector } from 'reselect';

const selectApp = () => (state) => state.get('app');

const selectProjectName = () => createSelector(
  selectApp(),
  (project) => project.get('name')
);

const selectProjectId = () => createSelector(
  selectApp(),
  (project) => project.get('_id')
);

const selectPlanSheets = () => createSelector(
  selectApp(),
  (project) => project.get('planSheets').toJS()
);

const selectDefaultPlanSheet = () => createSelector(
  selectApp(),
  (project) => project.getIn(['planSheets', 0])
);

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectLocationState,
  selectProjectId,
  selectProjectName,
  selectPlanSheets,
  selectDefaultPlanSheet,
};
