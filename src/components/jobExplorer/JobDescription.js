import React from 'react'

class JobDescription extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: null
    }
  }

  componentDidMount() {
    fetch(`https://api-v2.themuse.com/jobs/${this.props.jobId}`)
    .then(response => response.json())
    .then(json => this.setState({
      job: json
    }))
  }

  contents = () => {
    return {
      __html: this.state.job.contents
    };
  }

  categories = () => {
    let categoryList = this.state.job.categories.map((c) => {
      return c.name
    })
    return categoryList.join(" | ")
  }

  levels = () => {
    let levelList = this.state.job.levels.map((lvl) => {
      return lvl.name
    })
    return levelList.join(" | ")
  }

  locations = () => {
    let locationList = this.state.job.locations.map((l) => {
      return l.name
    })
    return locationList.join(" | ")
  }

  formattedDate = () => {
    let pubDate = new Date(this.state.job.publication_date)
    return pubDate.toLocaleDateString()
  }

  saveJob = (event) => {
    event.preventDefault()
    this.props.addToSavedJobs(this.state.job)
  }

  dynamicIcon = () => {
    let savedCheck = this.props.savedJobs.filter((j) => {
      return j.id == this.props.jobId
    })
  
    if (savedCheck.length > 0) {
      return (<i className="material-icons" style={{color:"blue", fontSize:"100%"}}>bookmark</i>)

    } else {
      return (<i className="material-icons" onClick={this.saveJob} style={{color:"blue"}}>bookmark_border</i>)
    }
  }


  render() {
    console.log(this.props.savedJobs)
    console.log(this.state.job)
    if (!this.state.job) {
      return <div>Loading</div>;
    }

    return (
      <div className="jobDescription">


        <h1>{this.state.job.name} {this.dynamicIcon()}</h1>
        <h2 className="jobDescriptionCompanyName">{this.state.job.company.name}</h2>
        <div className="jobDescriptionCategory">{this.categories()}</div>
        <div className="jobDescriptionLevel">{this.levels()}</div>
        <div className="jobDescriptionLocation">{this.locations()}</div>
        <div className="jobDescriptionDate">{this.formattedDate()}</div><br />
        <div className="jobDescriptionContent" dangerouslySetInnerHTML={this.contents()} />
      </div>

    )
  }
}

export default JobDescription
