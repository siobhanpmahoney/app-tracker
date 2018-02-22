import React from 'react'
import MyJobsItem from './MyJobsItem'

const MyJobsList = ({savedJobs}) => {

  return (
    <div>
    {savedJobs.map((j) => {
      return <MyJobsItem job={j} key={j.id}/>
    })}
      
    </div>
  )
}

export default MyJobsList
