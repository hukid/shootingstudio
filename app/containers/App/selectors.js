/**
 * The App state selectors
 */

import { createSelector } from 'reselect';

const selectProject = () => (state) => state.get('app');

const selectProjectName = () => createSelector(
  selectProject(),
  (project) => project.get('name')
);

const selectProjectId = () => createSelector(
  selectProject(),
  (project) => project.get('projectId')
);

const selectPlanSheets = () => createSelector(
  selectProject(),
  (project) => project.get('planSheets')
);

const selectActors = () => createSelector(
  selectProject(),
  (project) => project.get('actors')
);

const selectStages = () => createSelector(
  selectProject(),
  (project) => project.get('stages')
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
  selectProject,
  selectLocationState,
  selectProjectId,
  selectProjectName,
  selectPlanSheets,
  selectActors,
  selectStages,
};
