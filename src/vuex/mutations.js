import * as types from './mutation_type';

export default {
  [types.CHANGE_SIDEBAR_STATUS] (state , flag) {
      state.collapse = flag;
  }
};