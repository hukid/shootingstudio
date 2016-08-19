/*
 *
 * PlanSheet
 *
 */

import React from 'react';

import ActorList from 'containers/ActorList';

const PlanSheet = (props) => {
  let sheetRows = (<div className="row">empty</div>);
  window.scnes = props.planSheet.scenes;
  const scenes = props.planSheet.scenes;
  if (scenes) {
    sheetRows = scenes.map((scene, index) => (
      <div key={`scene-${index}`} className="row">
        <div className="col-md-3">{scene.seq}</div>
        <div className="col-md-3">{props.stageDict[scene.stage_id].name}</div>
        <div className="col-md-2">{scene.environment}</div>
        <ActorList styleName="col-md-4" actorIds={scene.actors} actorDict={props.actorDict} />
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
};

PlanSheet.propTypes = {
  planSheet: React.PropTypes.object.isRequired,
  stageDict: React.PropTypes.object.isRequired,
  actorDict: React.PropTypes.object.isRequired,
};

export default PlanSheet;
