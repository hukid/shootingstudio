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
  (project) => project.get('project_id')
);

const selectPlanSheets = () => createSelector(
  selectApp(),
  (project) => project.get('planSheets').toJS()
);

const selectActors = () => createSelector(
  selectApp(),
  (project) => {
    const actors = project.get('actors');
    const hashedActors = {};
    if (actors.toJS) {
      actors.toJS().forEach((actor) => {
        hashedActors[actor._id] = actor; // eslint-disable-line no-underscore-dangle
      });
    }

    return hashedActors;
  }
);

const selectStages = () => createSelector(
  selectApp(),
  (project) => {
    const stages = project.get('stages');
    const hashedStages = {};
    if (stages.toJS) {
      stages.toJS().forEach((stage) => {
        hashedStages[stage._id] = stage; // eslint-disable-line no-underscore-dangle
      });
    }

    return hashedStages;
  }
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
  selectActors,
  selectStages,
  selectDefaultPlanSheet,
};
