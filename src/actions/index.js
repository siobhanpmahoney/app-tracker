export const CURRENT_USER = 'CURRENT_USER'
export const ADD_NEW_JOB = 'ADD_NEW_JOB'

export function loadCurrentUser() {
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/users/1")
    .then(response => response.json())
    .then(json => dispatch({
      type: CURRENT_USER,
      currentUser: json,
      savedJobs: json.jobs,
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
            company_id: 2
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
