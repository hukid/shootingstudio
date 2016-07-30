/*
 *
 * PlanSheet
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectPlanSheet from './selectors';

export class PlanSheet extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      This is PlanSheet container !
      </div>
    );
  }
}

const mapStateToProps = selectPlanSheet();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSheet);
