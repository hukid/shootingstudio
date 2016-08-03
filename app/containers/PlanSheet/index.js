/*
 *
 * PlanSheet
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { loadPlanSheet } from './actions';
import { selectName, selectScenes } from './selectors';
import { createSelector } from 'reselect';
import { ActorList } from 'containers/ActorList';

export class PlanSheet extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.load();
  }

  render() {
    let sheetRows = (<div className="row">empty</div>);
    if (this.props.scenes) {
      sheetRows = this.props.scenes.map((scene, index) => (
        <div key={`scene-${index}`} className="row">
          <div className="col-md-3">{scene.seq}</div>
          <div className="col-md-3">{scene.stage}</div>
          <div className="col-md-2">{scene.environment}</div>
          <ActorList styleName="col-md-4" actors={scene.actors} />
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="btn" onClick={this.props.load}>Refresh</div>
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
  name: React.PropTypes.string.isRequired,
  load: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectName(),
  selectScenes(),
  (name, scenes) => ({ name, scenes })
);

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadPlanSheet()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSheet);
