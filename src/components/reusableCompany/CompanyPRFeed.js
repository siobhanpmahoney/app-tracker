import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class CompanyPRFeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pressReleases: []
    }
  }




  componentDidMount() {
      let searchCompany = this.props.company.name.split(" ").join("+")
      let url = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=prnewswire.com,businesswire.com,reuters.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`

      fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        pressReleases: json.articles.filter((pr) => pr.title.includes(this.props.company.name) || pr.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
      }),
    );
}

formattedDate = (date) => {
  let pubDate = new Date(date)
  return pubDate.toLocaleDateString()
}

addBookmark = (pr) => {
  console.log("in PR component")
  console.log(pr.title, pr.source.name, pr.description, pr.url, this.props.user.user.id, this.props.company.id)
  this.props.addBookmark(pr.title, pr.source.name, pr.description, pr.url, this.props.user.user.id, this.props.company.id)
}

dynamicBookmarkIcon = (info) => {
  if (this.props.savedBookmarks.find((bookmark) => {
    return bookmark.url == info.url
  })) {
    return (<i className="material-icons" name={info.title} id={info.url} style={{color:"#FF5370", fontSize:"100%"}}>bookmark</i>)
  } else {
    return (<i className="material-icons" value={info.title} id={info.url} onClick={()=>this.addBookmark(info)} style={{color:"#FF5370"}}>bookmark_border</i>)
  }
}

  render() {
    console.log(this.state)
    if (!this.props) {
      return<div>Loading!</div>
    }

    // if (this.props.company && this.state.pressReleases.length > 0) {
    //   this.state.pressReleases.map((pr) => {
    //     console.log({url: pr.url, title: pr.title, company_id: this.props.company.id})
    //   })
    // }
    //
    //
    // console.log(this.state.pressReleases[0].title, this.state.pressRelease)
    // console.log(this.props)
    return (
      <div>
        {this.state.pressReleases.map((press) => {
          return <div style={{display: "inlineBlock", float:"left", verticalAlign: "top", background:"white", boxShadow:"rgba(0, 0, 0, 0.25) 0px 14px 14px, rgba(0, 0, 0, 0.22) 0px 10px 10px", margin: "1em", padding: "0.25em", height: "300px", width: "250px"}}>

            <div style={{margin:"-1em"}}>
            <div style={{margin:"0.75em", padding:"0.5em", fontSize:"12.5px", fontWeight:"bold", display:"block", backgroundColor:"#30c9e8", color:"white"}}>{press.source.name}</div>
            </div>

<div>
            <div><img src={press.urlToImage} style={{width:"256px", maxHeight:"125px", display:"block", verticalAlign: "top", marginLeft:"-0.45em", marginRight:"-0.35em", marginTop:"0.25em", padding:"0.25em"}} /></div>

            <div style={{backgroundColor:"white", padding:"0.25em", marginTop:"0.25em"}}>
            <span style={{display:"inlineBlock", verticalAlign:"top", alignment:"right", margin:"0.1em", color:"#FF5370"}}>

          {this.dynamicBookmarkIcon(press)}


          </span>

          <div className="companyPressCardTitle" style={{margin:"0.25em", padding:"0.25em", display:"inlineBlock", verticalAlign:"bottom", textIndent:"0em", fontSize:"13px", fontFamily:"Calibri"}}>
            <a href={press.url} target="_blank">{press.title}</a>
          </div>

          <div className="companyPressCardTitle" style={{fontSize:"12.5px", fontFamily:"Calibri", margin:"0.25em", padding:"0.25em", fontStyle:"italic" }}>Published {new Date(press.publishedAt).toLocaleDateString()}</div>
</div>
          </div>
        </div>
        })}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.user.currentUser,
    savedJobs: state.user.savedJobs,
    savedCompanies: state.user.savedCompanies,
    savedNotes: state.user.savedNotes,
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPRFeed);
