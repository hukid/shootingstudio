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
      errors: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChangeStage = this.handleChangeStage.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
    this.handleChangeActors = this.handleChangeActors.bind(this);
  }

  onSubmit(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    this.props.addNewScene(this.state.stage, this.state.environment, this.state.actors);
  }

  validateForm() {
    const newErrors = [];
    if (!this.state.stage || this.state.stage.trim() === '') {
      newErrors.push('Stage should not be empty');
    }

    if (!this.state.environment || this.state.environment.trim() === '') {
      newErrors.push('environment should not be empty');
    } else if (this.state.environment !== '1' && this.state.environment !== '0') {
      newErrors.push('environment can only be 0 or 1');
    }

    if (!this.state.actors || this.state.actors.trim() === '') {
      newErrors.push('actors should not be empty');
    }

    this.setState({ errors: newErrors });

    return newErrors.length === 0;
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
    let errorLabels = '';
    if (this.state.errors.length > 0) {
      errorLabels = this.state.errors.map((error, index) => (
        <div key={`formError-${index}`}>{error}</div>
      ));
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {errorLabels}
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
