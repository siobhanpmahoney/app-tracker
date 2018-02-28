import { combineReducers } from 'redux';
import { CURRENT_USER, ADD_NEW_JOB, LOAD_SAVED_JOB } from '../actions'

const user = (state = {currentUser: null, savedJobs: [], savedCompanies: [], renderedJob: [], renderedCompany: []}, action) => {
  switch(action.type) {
    case CURRENT_USER:
      state = Object.assign({},
        state,
        {
          currentUser: action.currentUser,
          savedJobs: action.savedJobs,
          savedCompanies: action.savedCompanies,
        }
      );
      return state;
    case ADD_NEW_JOB:
      state = Object.assign({},
        state,
        {
          savedJobs: action.savedJobs,
        }
      );
      return state;
    case LOAD_SAVED_JOB:

      state = Object.assign({},
        state,
        {
          renderedJob: action.renderedJob,
          renderedCompany: action.renderedCompany,
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
