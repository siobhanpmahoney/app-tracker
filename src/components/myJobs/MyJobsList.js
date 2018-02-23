import React from 'react'
import MyJobsItem from './MyJobsItem'

const MyJobsList = ({user, savedJobs}) => {

  return (
    <div>
    {savedJobs.map((j) => {
      return <MyJobsItem job={j} key={j.id} user = {user} />
    })}

    </div>
  )
}

export default MyJobsList
