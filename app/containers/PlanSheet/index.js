/*
 *
 * PlanSheet
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { loadPlanSheet } from './actions';
import { selectScenes } from './selectors';
import { selectStages } from 'containers/App/selectors';
import ActorList from 'containers/ActorList';

class PlanSheet extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    let sheetRows = (<div className="row">empty</div>);
    window.scnes = this.props.scenes;
    if (this.props.scenes) {
      sheetRows = this.props.scenes.map((scene, index) => (
        <div key={`scene-${index}`} className="row">
          <div className="col-md-3">{scene.seq}</div>
          <div className="col-md-3">{this.props.stages[scene.stage_id].name}</div>
          <div className="col-md-2">{scene.environment}</div>
          <ActorList styleName="col-md-4" actorIds={scene.actors} />
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">场次</div>
          <div className="col-md-3">场景</div>
          <div className="col-md-2">氛围</div>
          <div className="col-md-4">主要演员</div>
        </div>
        {sheetRows}
      </div>
    );
  }
}

PlanSheet.propTypes = {
  stages: React.PropTypes.object.isRequired,
  scenes: React.PropTypes.array.isRequired,
  load: React.PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  selectScenes(),
  selectStages(),
  (scenes, stages) => ({ scenes, stages })
);

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadPlanSheet()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSheet);
