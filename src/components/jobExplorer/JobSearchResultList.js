import React from 'react'
import JobSearchResultItem from './JobSearchResultItem'

const JobSearchResultList = ({jobSearchResults, savedJobs, addToSavedJobs}) => {
  return(
    <div className="jobSearchResultList">
      {jobSearchResults.map((j) => {
        return <JobSearchResultItem job={j} key={j.id} savedJobs={savedJobs} addToSavedJobs={addToSavedJobs} museJobId={j.id} />
      })}
    </div>
  )
}


export default JobSearchResultList
