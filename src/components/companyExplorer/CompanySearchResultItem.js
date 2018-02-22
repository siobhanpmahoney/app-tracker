import React from 'react'

class CompanySearchResultItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderIndustryList = () => {
    let industries = this.props.company.industries.map((i) => {
      return i.name
    })
    return industries.join(" | ")
  }

  renderLocationList = () => {
    let locations = this.props.company.locations.map((i) => {
      return i.name
    })
    return locations.join(" | ")
  }

  render() {
    return (
      <div>

      <div className="companySearchResultCard">


        {this.props.company.refs &&
          <img src={this.props.company.refs.f1_image} className="icon" />
        }
          <h4>{this.props.company.name}</h4>
        <div className="location">{this.renderIndustryList()}</div>
        <div className="industryList">{this.renderLocationList()}</div>
        <div className="coDescription">{this.props.company.description}</div>
        

      </div>
      </div>
    )
  }
}

export default CompanySearchResultItem
