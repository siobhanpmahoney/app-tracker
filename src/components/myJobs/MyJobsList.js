import React from 'react'
import MyJobsItem from './MyJobsItem'

const MyJobsList = ({user, savedJobs, savedCompanies, loadSavedJob}) => {

  return (

    <div>
    {savedJobs.map((j) => {
      return <MyJobsItem job={j} key={j.id} user = {user} loadSavedJob={loadSavedJob} />
    })}

    </div>
  )
}

export default MyJobsList
