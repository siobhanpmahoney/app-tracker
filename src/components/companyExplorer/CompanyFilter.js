import React from 'react'



const CompanyFilter = ({industrySelectListener, handleCompanySearchSubmit, industrySelection, locationSelectListener}) => {
  const industryOptions=["Advertising and Agencies", "Architecture", "Arts and Music", "Client Services", "Consulting",  "Education", "Entertainment & Gaming", "Fashion and Beauty", "Finance", "Food", "Government", "Healthcare", "Law", "Media", "Real Estate & Construction", "Social Good", "Social Media", "Tech", "Travel and Hospitality"]
  
  return (
    <div>
    <div className="locationList">
      <h3>Filter By City</h3>
      <label style={{padding:"3px"}}>Austin, TX
      <input type="checkbox" onChange={locationSelectListener} value="Austin%2C%20TX" />
      </label>
      
      <label style={{padding:"3px"}}>Boston, MA
      <input type="checkbox" onChange={locationSelectListener} value="Boston%2C%20MA" />
      </label>
      
      <label style={{padding:"3px"}}>Chicago, IL
      <input type="checkbox" onChange={locationSelectListener} value="Chicago%2C%20IL" />
      </label>
      
      <label style={{padding:"3px"}}>Los Angeles, CA
      <input type="checkbox" onChange={locationSelectListener} value="Los%20Angeles%2C%20CA" />
      </label>
      
      <label style={{padding:"3px"}}>New York City, NY
      <input type="checkbox" onChange={locationSelectListener} value="New%20York%20City%2C%20NY" />
      </label>
      
      <label style={{padding:"3px"}}>Portland, OR
      <input type="checkbox" onChange={locationSelectListener} value="Portland%2C%20OR" />
      </label>
      
      <label style={{padding:"3px"}}>San Francisco, CA
      <input type="checkbox" onChange={locationSelectListener} value="San%20Francisco%2C%20CA" />
      </label>
      
      <label style={{padding:"3px"}}>Seattle, WA
      <input type="checkbox" onChange={locationSelectListener} value="Seattle%2C%20WA" />
      </label>
      
      <label style={{padding:"3px"}}>Washington, DC
      <input type="checkbox" onChange={locationSelectListener} value="Washington%2C%20DC" />
      </label>
      
      
    </div>
    
    <div className="industries">
    <h3>Industry</h3>
    {industryOptions.map((industry) => {
    return <label> {industry}
    <input type="checkbox" value={industry.split(' ').join('%20')} onChange={industrySelectListener} key={industry}/>
    </label>
  })}

  <p><input type="submit" onClick={handleCompanySearchSubmit}/></p>
  </div>
</div>
)

}

export default CompanyFilter
