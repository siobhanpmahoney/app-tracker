export const CURRENT_USER = 'CURRENT_USER'

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
