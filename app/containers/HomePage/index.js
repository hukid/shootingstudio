/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectProjectId, selectStages, selectActors } from 'containers/App/selectors';
import { selectDefaultPlanSheet } from './selectors';
import { loadProject } from 'containers/App/actions';
import { addScene } from './actions';

import PlanSheet from 'containers/PlanSheet';
import SceneComposeForm from 'containers/SceneComposeForm';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.load();
  }

  addScene(projectId, planSheetId, stage, environment, actors) {
    this.props.addNewScene(projectId, planSheetId, stage, environment, actors);
  }

  render() {
    let content = '<h2> Plan Sheet is Loading </h2>';
    if (this.props.planSheet) {
      const planSheet = this.props.planSheet.toJS();
      this.addScene = this.addScene.bind(this, this.props.projectId, planSheet._id); // eslint-disable-line react/jsx-no-bind, no-underscore-dangle
      content = (
        <div>
          <PlanSheet planSheet={planSheet} stageDict={this.props.stages} actorDict={this.props.actors} />
          <SceneComposeForm addNewScene={this.addScene} />
        </div>
      );
    }

    return (
      <div>
        <h1>This is the Homepage!</h1>
        <div className="btn" onClick={this.props.load}>Refresh</div>
        {content}
      </div>
    );
  }
}

HomePage.propTypes = {
  load: React.PropTypes.func,
  projectId: React.PropTypes.string.isRequired,
  planSheet: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  stages: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  actors: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  addNewScene: React.PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  selectProjectId(),
  selectDefaultPlanSheet(),
  selectStages(),
  selectActors(),
  // (state, ownProps) => {
  //   window.globalState = state;
  //   window.globalProps = ownProps;
  //   return 'name';
  // },
  (projectId, planSheet, stages, actors) => ({ projectId, planSheet, stages, actors })
);

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadProject()),
    addNewScene: (projectId, planSheetId, stage, environment, actors) => dispatch(addScene(projectId, planSheetId, stage, environment, actors)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
