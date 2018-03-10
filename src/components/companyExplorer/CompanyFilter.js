import React from 'react'



const CompanyFilter = ({industrySelectListener, handleCompanySearchSubmit, industrySelection, locationSelectListener, sizeSelectListener}) => {
  const industryOptions=["Advertising and Agencies", "Architecture", "Arts and Music", "Client Services", "Consulting",  "Education", "Entertainment & Gaming", "Fashion and Beauty", "Finance", "Food", "Government", "Healthcare", "Law", "Media", "Real Estate & Construction", "Social Good", "Social Media", "Tech"]

  const sizeOptions=["Small Size", "Medium Size", "Large Size"]

  return (
    <div className="companyFilters">
    <div className="locationList" style={{backgroundColor:"white", padding:"0.5em", margin:"0.5em", height:"400px", gridAutoFlow:"row", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)"}}>
      <h3>Filter By City</h3>
      <label style={{padding:"3px"}}>Austin, TX
      <input type="checkbox" onChange={locationSelectListener} value="Austin%2C%20TX" />
      </label><br />

      <label style={{padding:"3px"}}>Boston, MA
      <input type="checkbox" onChange={locationSelectListener} value="Boston%2C%20MA" />
      </label><br />

      <label style={{padding:"3px"}}>Chicago, IL
      <input type="checkbox" onChange={locationSelectListener} value="Chicago%2C%20IL" />
      </label><br />

      <label style={{padding:"3px"}}>Los Angeles, CA
      <input type="checkbox" onChange={locationSelectListener} value="Los%20Angeles%2C%20CA" />
      </label><br />

      <label style={{padding:"3px"}}>New York City, NY
      <input type="checkbox" onChange={locationSelectListener} value="New%20York%20City%2C%20NY" />
      </label><br />

      <label style={{padding:"3px"}}>Portland, OR
      <input type="checkbox" onChange={locationSelectListener} value="Portland%2C%20OR" />
      </label><br />

      <label style={{padding:"3px"}}>San Francisco, CA
      <input type="checkbox" onChange={locationSelectListener} value="San%20Francisco%2C%20CA" />
      </label><br />

      <label style={{padding:"3px"}}>Seattle, WA
      <input type="checkbox" onChange={locationSelectListener} value="Seattle%2C%20WA" />
      </label><br />

      <label style={{padding:"3px"}}>Washington, DC
      <input type="checkbox" onChange={locationSelectListener} value="Washington%2C%20DC" />
      </label><br />


    </div>

    <div className="industryFilter" style={{backgroundColor:"white", padding:"0.5em", margin:"0.5em", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)", height:"400px", fontSize:"14px", style:"inlineBlock", float:"left", gridAutoFlow:"column"}}>
    <h3>Industry</h3>
    {industryOptions.map((industry) => {
    return <label> {industry}
    <input type="checkbox" value={industry.split(' ').join('%20')} onChange={industrySelectListener} key={industry} /><br />
    </label>
  })}

  </div>

  <div className="sizeFilter" style={{backgroundColor:"white", margin:"0.5em", padding:"0.5em", boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)", height:"400px", gridAutoFlow:"column"}}>
    <h3>Company Size</h3>
  {sizeOptions.map((size) => {
    return <p><label>{size}
    <input type="checkbox" value={size.split(' ').join('%20')} onChange={sizeSelectListener} key={size}/> </label></p>
  })}
</div>
<p><input type="submit" onClick={handleCompanySearchSubmit}/></p>
</div>
)

}

export default CompanyFilter
