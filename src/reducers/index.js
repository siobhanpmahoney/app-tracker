import { combineReducers } from 'redux';
import { CURRENT_USER, ADD_NEW_JOB, EDIT_JOB, DELETE_JOB } from '../actions'

const user = (state = {currentUser: null, savedJobs: [], savedCompanies: []}, action) => {
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
    case EDIT_JOB:
      let index = state.savedJobs.findIndex((job) => {
        return job.id == action.job.id
      })

      return [
        ...state.savedJobs.slice(0, index),
        action.job,
        ...state.savedJobs.slice(index + 1)
      ];

    case DELETE_JOB:
      const jobs = state.savedJobs.filter((job) => job.id != action.selectedJobId)
      state = Object.assign({},
        state, {
          savedJobs: jobs,
        }
      )
      return state;

    // case LOAD_SAVED_JOB:
    //
    //   state = Object.assign({},
    //     state,
    //     {
    //       renderedJob: action.renderedJob,
    //       renderedCompany: action.renderedCompany,
    //     }
    //   );
    //   return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
