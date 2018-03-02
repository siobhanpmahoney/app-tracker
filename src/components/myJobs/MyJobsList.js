import React from 'react'
import MyJobsItem from './MyJobsItem'

const MyJobsList = ({user, savedJobs, savedCompanies, savedNotes, loadSavedJob}) => {

  return (

    <div>
    {savedJobs.map((j) => {
      return <MyJobsItem job={j} key={j.id} user = {user} savedJobs={savedJobs} savedCompanies={savedCompanies} savedNotes={savedNotes} loadSavedJob={loadSavedJob} />
    })}

    </div>
  )
}

export default MyJobsList
