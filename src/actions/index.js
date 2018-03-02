export const CURRENT_USER = 'CURRENT_USER'
export const ADD_NEW_JOB = 'ADD_NEW_JOB'
export const EDIT_JOB = 'EDIT_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const EDIT_NOTE = 'EDIT_NOTE'

export function loadCurrentUser() {
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/users/1")
    .then(response => response.json())
    .then(json => dispatch({
      type: CURRENT_USER,
      currentUser: json,
      savedJobs: json.jobs,
      savedCompanies: json.companies,
      savedNotes: json.notes
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
          applied_status: selectedJob.applied_status,
          date_applied: selectedJob.date_applied,
          response_date: selectedJob.response_date,
          followup_date: selectedJob.followup_date,
          interview_invite: selectedJob.interview_invite,
          interview_1_date: selectedJob.interview_1_date,
          interview_1_type: selectedJob.interview_1_type,
          interview_2_date: selectedJob.interview_2_date,
          interview_2_type: selectedJob.interview_2_type
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
            company_museId: selectedJob.company.id
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
