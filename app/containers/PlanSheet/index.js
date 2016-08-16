/*
 *
 * PlanSheet
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { loadPlanSheet } from './actions';
import { selectScenes } from './selectors';
import { createSelector } from 'reselect';
import { ActorList } from 'containers/ActorList';

export class PlanSheet extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // this.props.load();
  }

  render() {
    let sheetRows = (<div className="row">empty</div>);
    window.scnes = this.props.scenes;
    if (this.props.scenes) {
      sheetRows = this.props.scenes.map((scene, index) => (
        <div key={`scene-${index}`} className="row">
          <div className="col-md-3">{scene.seq}</div>
          <div className="col-md-3">{scene.stage.name}</div>
          <div className="col-md-2">{scene.environment}</div>
          <ActorList styleName="col-md-4" actors={scene.actors} />
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
  scenes: React.PropTypes.array,
  load: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectScenes(),
  (scenes) => ({ scenes })
);

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadPlanSheet()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSheet);
