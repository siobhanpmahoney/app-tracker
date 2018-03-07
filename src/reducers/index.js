import { combineReducers } from 'redux';
import { CURRENT_USER, ADD_NEW_JOB, EDIT_JOB, DELETE_JOB, ADD_NEW_NOTE, EDIT_NOTE, ADD_NEW_BOOKMARK } from '../actions'

const user = (state = {currentUser: null, savedJobs: [], savedCompanies: [], savedNotes: [], savedBookmarks: [], savedCategories:[], savedIndustries: []}, action) => {
  switch(action.type) {
    case CURRENT_USER:
      state = Object.assign({},
        state,
        {
          currentUser: action.currentUser,
          savedJobs: action.savedJobs,
          savedCompanies: action.savedCompanies,
          savedNotes: action.savedNotes,
          savedBookmarks: action.savedBookmarks,
          savedCategories: action.savedCategories,
          savedIndustries: action.savedIndustries
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

    case ADD_NEW_NOTE:
    debugger
      let userNotes = state.savedNotes

    state=Object.assign({},
      state,
      {
        savedNotes: [...userNotes, action.newNote],
      }
    );
    return state;


    case EDIT_NOTE:
      let noteIndex = state.savedNotes.findIndex((note) => {
        return note.id == action.note.id
      })
      return [
        ...state.savedNotes.slice(0, noteIndex),
        action.note,
        ...state.savedNotes.slice(noteIndex + 1)
      ];


    case ADD_NEW_BOOKMARK:
      let userBookmarks = state.savedBookmarks
      console.log(userBookmarks)
      console.log(action.newBookmark)
      state = Object.assign({},
        state,
        {
          savedBookmarks: [...userBookmarks, action.newBookmark],
        }
      );
      console.log(state)
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
