import { combineReducers } from 'redux';
import { CURRENT_USER } from '../actions'

const user = (state = {currentUser: null, savedJobs: []}, action) => {
  switch(action.type) {
    case CURRENT_USER:
      state = Object.assign({},
        state,
        {
          currentUser: action.currentUser,
          savedJobs: action.savedJobs,
        }
      );
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
