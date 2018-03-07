export const CURRENT_USER = 'CURRENT_USER'
export const ADD_NEW_JOB = 'ADD_NEW_JOB'
export const EDIT_JOB = 'EDIT_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const ADD_NEW_NOTE = 'ADD_NEW_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const ADD_NEW_BOOKMARK = 'ADD_NEW_BOOKMARK'


export function loadCurrentUser(user) {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/users/${user.id}`)
    .then(response => response.json())
    .then(json => dispatch({
      type: CURRENT_USER,
      currentUser: json,
      savedJobs: json.jobs,
      savedCompanies: json.companies,
      savedNotes: json.notes,
      savedBookmarks: json.bookmarks,
      savedCategories: json.categories,
      savedIndustries: json.industries
    }))
  }
}

export function editJob(selectedJob) {
  let url = "http://localhost:3000/api/v1/users/1/jobs/" + selectedJob.id
  console.log(url)
  console.log('selectedJob', selectedJob)
  console.log(selectedJob.id)
  return(dispatch) => {
    return fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          overall_active_status: selectedJob.overall_active_status,
          applied_status: selectedJob.applied_status,
          date_applied: selectedJob.date_applied,
          application_response_status: selectedJob.application_response_status,
          interview_invite: selectedJob.interview_invite,
          interview_1_date: selectedJob.interview_1_date,
          interview_1_type: selectedJob.interview_1_type,
          interview_1_technical: selectedJob.interview_1_technical,
          interview_1_response: selectedJob.interview_1_response,
          interview_2_date: selectedJob.interview_2_date,
          interview_2_type: selectedJob.interview_2_type,
          interview_2_technical: selectedJob.interview_2_technical,
          interview_2_response: selectedJob.interview_2_response,
          interview_3_date: selectedJob.interview_3_date,
          interview_3_type: selectedJob.interview_3_type,
          interview_3_technical: selectedJob.interview_3_technical,
          interview_3_response: selectedJob.interview_3_response,
          offer_status: selectedJob.offer_status

        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: EDIT_JOB,
        job: selectedJob
      }))
  }
}

export function deleteJob(selectedJobId) {
  let url = "http://localhost:3000/api/v1/users/1/jobs/" + selectedJobId
  return(dispatch) => {
    return fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch({
      type: DELETE_JOB,
      savedJobs: json
    }))
  }
}

export function saveNewJob(selectedJob) {
  console.log("in action - saveNewJob")
  console.log(selectedJob)
  return(dispatch) => {
    fetch("http://localhost:3000/api/v1/users/1/jobs",
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          jobs: {
            title: selectedJob.name,
            date_published: selectedJob.publication_date,
            contents: selectedJob.contents,
            museId: selectedJob.id,
            location: selectedJob.locations[0].name,
            level: selectedJob.levels[0].name,
            date_saved: Date.now(),
            applied_status: false,
            company_museId: selectedJob.company.id,
            category: selectedJob.categories,
            overall_active_status: true
          }
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: ADD_NEW_JOB,
        savedJobs: json
      }))
    }
  }

  export function addNewNote(selectedNote, noteUserId, noteCompanyId, noteJobId) {
    console.log(selectedNote, noteUserId, noteCompanyId, noteJobId)
    return(dispatch) => {
       fetch(`http://localhost:3000/api/v1/notes`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          title: selectedNote.title,
          content: selectedNote.content,
          user_id: noteUserId,
          company_id: noteCompanyId,
          job_id: noteJobId
        })
      })
      .then(response => response.json())
      .then(json => {

        dispatch({
        type: ADD_NEW_NOTE,
        newNote: json,
        user: noteUserId
      })
    })
    }
  }

  export function editNote(selectedNote, noteUserId, noteJobId, noteCompanyId) {
    let url = "http://localhost:3000/api/v1/notes/" + selectedNote.id
    return(dispatch) => {
      return fetch(url,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          title: selectedNote.title,
          content: selectedNote.content,
          user_id: noteUserId,
          note_id: noteJobId,
          company_id: noteCompanyId
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: EDIT_NOTE,
        note: selectedNote
      }))
    }
  }

  export function addNewBookmark(bookmarkTitle, bookmarkUrl, bookmarkUserId, bookmarkCompanyId) {
    console.log(bookmarkTitle, bookmarkUrl, bookmarkUserId, bookmarkCompanyId)
    return (dispatch) => {
      fetch('http://localhost:3000/api/v1/bookmarks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          title: bookmarkTitle,
          url: bookmarkUrl,
          user_id: bookmarkUserId,
          company_id: bookmarkCompanyId
        })
      })
      .then(response => response.json())
      .then(json => dispatch({
        type: ADD_NEW_BOOKMARK,
        newBookmark: json,
        user: bookmarkUserId
      }))
    }
  }
