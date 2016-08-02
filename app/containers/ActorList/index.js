/*
 *
 * ActorList
 *
 */

import React from 'react';
import { connect } from 'react-redux';

export class ActorList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const actors = this.props.actors;
    window.globalactors = actors;
    let actorContent = '';
    actors.forEach((actor) => {
      actorContent = actorContent + actor.name + ";";
    });

    return (
      <div className={this.props.styleName}>
        {actorContent}
      </div>
    );
  }
}

ActorList.propTypes = {
  actors: React.PropTypes.array,
  styleName: React.PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(ActorList);
