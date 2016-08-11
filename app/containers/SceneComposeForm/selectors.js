import { createSelector } from 'reselect';

/**
 * Direct selector to the planSheet state domain
 */
const selectSceneComposeDomain = () => state => state.get('sceneCopmose');

/**
 * Other specific selectors
 */

const selectStage = () => createSelector(
  selectSceneComposeDomain(),
  (sceneCompose) => sceneCompose.get('stage')
);

const selectEnvironment = () => createSelector(
  selectSceneComposeDomain(),
  (sceneCompose) => sceneCompose.get('environment')
);

const selectActors = () => createSelector(
  selectSceneComposeDomain(),
  (sceneCompose) => sceneCompose.get('actors').toJS()
);

export {
  selectStage,
  selectEnvironment,
  selectActors,
};
