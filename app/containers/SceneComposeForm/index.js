/*
 *
 * SceneComposeForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';

class SceneComposeForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      stage: '',
      environment: '',
      actors: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeStage = this.handleChangeStage.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.handleChangeActors = this.handleChangeActors.bind(this);
  }

  onSubmit(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.props.addNewScene(this.state.stage, this.state.environment, this.state.actors);
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
        <form onSubmit={this.onSubmit}>
          <label>场景:<input value={this.state.stage} onChange={this.handleChangeStage} /></label>
          <label>氛围:<input value={this.state.environment} onChange={this.handleChangeEnvironment} /></label>
          <label>主要演员:<input value={this.state.actors} onChange={this.handleChangeActors} /></label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

SceneComposeForm.propTypes = {
  addNewScene: React.PropTypes.func.isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(SceneComposeForm);
export default connect()(SceneComposeForm);
