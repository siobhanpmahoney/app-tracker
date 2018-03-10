import React from 'react'

const JobFilter = ({categorySelectListener, levelSelectListener, locationSelectListener, handleJobSearchSubmit}) => {
  const categoryOptions = [
    "Account Management", "Business & Strategy", "Creative & Design", "Customer Service", "Data Science", "Editorial", "Education", "Engineering", "Finance", "Fundraising & Development", "Healthcare & Medicine", "HR & Recruiting", "Legal", "Marketing & PR", "Operations", "Project & Product Management", "Retail", "Sales", "Social Media & Community"]

  return (
    <div className="jobFilters">
      <div className="jobFilterCategory" style={{backgroundColor:"white", padding:"0.5em", margin:"0.5em", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)", height:"410px", fontSize:"14px", style:"inlineBlock", float:"left", gridAutoFlow:"column"}}>

        <h3>Select Job Category</h3>
          {categoryOptions.map((c) => {
            return <label>{c}
              <input type="checkbox" value={c.split("&").join("%26").split(" ").join("%20")} onChange={categorySelectListener} />
            <br /></label>
          })}
      </div>

      <div className="jobFilterLevel" style={{backgroundColor:"white", padding:"0.5em", margin:"0.5em", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)", height:"410px", fontSize:"14px", style:"inlineBlock", float:"left", gridAutoFlow:"column"}}>
        <h3>Select Level</h3>
        <label>Internship
          <input type="checkbox" onChange={levelSelectListener} value="Internship" />
        <br /></label>
        <label>Entry Level
          <input type="checkbox" onChange={levelSelectListener} value="Entry%20Level" />
        <br /></label>
        <label>Mid Level
          <input type="checkbox" onChange={levelSelectListener} value="Mid%20Level" />
        <br /></label>
        <label>Senior Level
          <input type="checkbox" onChange={levelSelectListener} value="Senior%20Level" />
        <br /></label>
      </div>

      <div className="jobFilterLocation"style={{backgroundColor:"white", padding:"0.5em", margin:"0.5em", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)", height:"410px", fontSize:"14px", style:"inlineBlock", float:"left", gridAutoFlow:"column"}}>
      <h3>Filter By City</h3>
      <label style={{padding:"3px"}}>Austin, TX
      <input type="checkbox" onChange={locationSelectListener} value="Austin%2C%20TX" />
      <br /></label>

      <label style={{padding:"3px"}}>Boston, MA
      <input type="checkbox" onChange={locationSelectListener} value="Boston%2C%20MA" />
      <br /></label>

      <label style={{padding:"3px"}}>Chicago, IL
      <input type="checkbox" onChange={locationSelectListener} value="Chicago%2C%20IL" />
      <br /></label>

      <label style={{padding:"3px"}}>Los Angeles, CA
      <input type="checkbox" onChange={locationSelectListener} value="Los%20Angeles%2C%20CA" />
      <br /></label>

      <label style={{padding:"3px"}}>New York City, NY
      <input type="checkbox" onChange={locationSelectListener} value="New%20York%20City%2C%20NY" />
      <br /></label>

      <label style={{padding:"3px"}}>Portland, OR
      <input type="checkbox" onChange={locationSelectListener} value="Portland%2C%20OR" />
      <br /></label>

      <label style={{padding:"3px"}}>San Francisco, CA
      <input type="checkbox" onChange={locationSelectListener} value="San%20Francisco%2C%20CA" />
      <br /></label>

      <label style={{padding:"3px"}}>Seattle, WA
      <input type="checkbox" onChange={locationSelectListener} value="Seattle%2C%20WA" />
      <br /></label>

      <label style={{padding:"3px"}}>Washington, DC
      <input type="checkbox" onChange={locationSelectListener} value="Washington%2C%20DC" />
      <br /></label>
      </div>
      <div className="searchButton" style={{gridColumn:"1/ span 1"}}>
        <input type="submit" value="search" onClick={handleJobSearchSubmit} />
      </div>
    </div>

  )
}

export default JobFilter
