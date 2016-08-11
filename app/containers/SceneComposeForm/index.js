/*
 *
 * SceneComposeForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { addScene } from './actions';

export class SceneComposeForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      stage: '',
      environment: '',
      actors: '',
    };
  }

  handleChangeStage(event) {
    this.setState({ stage: event.target.value });
  }

  handleChangeEnvironment(event) {
    this.setState({ environment: event.target.value });
  }

  handleChangeActors(event) {
    this.setState({ actors: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <label>场景:<input value={this.state.stage} onChange={this.handleChangeStage} /></label>
          <label>氛围:<input value={this.state.environment} onChange={this.handleChangeEnvironment} /></label>
          <label>主要演员:<input value={this.state.actors} onChange={this.handleChangeActors} /></label>
        </form>
      </div>
    );
  }
}

SceneComposeForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

// const mapStateToProps = createSelector(
//   selectStage(),
//   selectEnvironment(),
//   selectActors(),
//   (statge, env, actors) => ({ statge, env, actors })
// );

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => dispatch(addScene(this.state.stage, this.state.environment, this.state.actors)),
    dispatch,
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(SceneComposeForm);
export default connect(mapDispatchToProps)(SceneComposeForm);
