/*
 *
 * PlanSheet reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  name: 'MyFirstProject',
  scenes: [
    {
      seq: 1,
      stage: 'Church',
      environment: 'day',
      actors: [
        { name: 'Xiaomei' },
        { name: 'Dachui' },
      ] },
    {
      seq: 2,
      stage: 'Home',
      environment: 'night',
      actors: [
        { name: 'Xiaomei' },
      ] },
    {
      seq: 3,
      stage: 'Home',
      environment: 'day',
      actors: [
        { name: 'Fei Hong' },
      ] },
  ],
});

function planSheetReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default planSheetReducer;

  // {
  //   // scenes: [
  //   //   {
  //   //     seq: 1,
  //   //     stage: 'Church',
  //   //     environment: 'day',
  //   //     actors: [
  //   //       { name: 'Xiaomei' },
  //   //       { name: 'Dachui' },
  //   //   ]},
  //   //   {
  //   //     seq: 2,
  //   //     stage: 'Home',
  //   //     environment: 'night',
  //   //     actors: [
  //   //       { name: 'Xiaomei' },
  //   //   ]},
  //   //   {
  //   //     seq: 3,
  //   //     stage: 'Home',
  //   //     environment: 'day',
  //   //     actors: [
  //   //       { name: 'Fei Hong' },
  //   //   ]},
  //   // ],
  //   test : 'test',
  // },
