/*
 *
 * ActorList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectActors } from 'containers/App/selectors';

class ActorList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const actorIds = this.props.actorIds;
    let actorContent = '';
    actorIds.forEach((actorId) => {
      actorContent = `${actorContent}${this.props.actors[actorId._id].name};`; // eslint-disable-line no-underscore-dangle
    });

    return (
      <div className={this.props.styleName}>
        {actorContent}
      </div>
    );
  }
}

ActorList.propTypes = {
  actorIds: React.PropTypes.array,
  actors: React.PropTypes.object,
  styleName: React.PropTypes.string,
};

const mapStateToProps = createSelector(
  selectActors(),
  (actors) => ({ actors })
);


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorList);
