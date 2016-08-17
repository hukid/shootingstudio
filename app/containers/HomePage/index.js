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
import { loadProject } from 'containers/App/actions';
import { selectProjectId } from 'containers/App/selectors';
import { createSelector } from 'reselect';
import PlanSheet from 'containers/PlanSheet';
import SceneComposeForm from 'containers/SceneComposeForm';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.load();
  }

  render() {
    window.globalProps = this.props;
    return (
      <div>
        <h1>This is the Homepage!</h1>
        <div className="btn" onClick={this.props.load}>Refresh</div>
        <PlanSheet />
        <SceneComposeForm />
      </div>
    );
  }
}

HomePage.propTypes = {
  load: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectProjectId,
  (name) => ({ name })
);

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadProject()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
