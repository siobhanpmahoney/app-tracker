import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class CompanyArticleFeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }
  }

  formattedDate = (date) => {
    let pubDate = new Date(date)
    return pubDate.toLocaleDateString()
  }




  componentDidMount() {
      let searchCompany = this.props.company.name.split(" ").join("+")
      let articleUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
    fetch(articleUrl)
    .then(response => response.json())
    .then(json => this.setState({
      articles: json.articles.filter((article) => article.title.includes(this.props.company.name) || article.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
    }),
  );
}

addBookmark = (article) => {
  console.log("in PR component")
  console.log(article.title, article.url, this.props.user.user.id, this.props.company.id)
  this.props.addBookmark(article.title, article.url, this.props.user.user.id, this.props.company.id)
}

dynamicBookmarkIcon = (info) => {
  if (this.props.savedBookmarks.find((bookmark) => {
    return bookmark.url == info.url
  })) {
    return (<i className="material-icons" name={info.title} id={info.url} style={{color:"blue", fontSize:"100%"}}>bookmark</i>)
  } else {
    return (<i className="material-icons" value={info.title} id={info.url} onClick={()=>this.addBookmark(info)} style={{color:"blue"}}>bookmark_border</i>)
  }
}

  render() {
    if (!this.props) {
      return<div>Loading!</div>
    }
    if (!this.state.articles) {
      return<div>Loading..</div>
    }


    return (
      <div>
        {this.state.articles.map((article) => {
          return <div style={{display: "block", verticalAlign: "middle", justifyContent: "left", boxShadow:"rgba(0, 0, 0, 0.25) 0px 14px 14px, rgba(0, 0, 0, 0.22) 0px 10px 10px", margin: "0.5em", padding: "0.5em", height: "150px", width: "360px", paddingTop:"2em"}}>

            <span style={{display:"block", verticalAlign:"top",clear:"both", alignment:"right", margin:"0.1em", color:"blue"}}>

          {this.dynamicBookmarkIcon(article)}

          <a href={article.url} target="_blank"><i className="material-icons" style={{fontSize:"18px"}}>launch</i></a>
          </span>

          <div><img src={article.urlToImage} style={{maxHeight:"75px", maxWidth:"120px", float:"right", display:"inlineBlock", verticalAlign: "top", padding:"0.2em", margin:"0.2em", border:"1px red solid"}} /></div>

          <div style={{marginTop:"1em", padding:"0.5em", fontSize:"12.5px", fontWeight:"bold", display:"inline",  verticalAlign:"bottom"}}>{article.source.name}</div>

          <div className="companyPressCardTitle" style={{margin:"0.25em", padding:"0.25em", display:"inlineBlock", verticalAlign:"bottom", textIndent:"0em", fontSize:"13px", fontFamily:"Roboto"}}>{article.title}</div>

          <div className="companyPressCardTitle" style={{fontSize:"12.5px", fontFamily:"Roboto", margin:"0.25em", padding:"0.25em", fontStyle:"italic" }}>{article.publishedAt}</div>

          </div>
        })}}
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
    savedBookmarks: state.user.savedBookmarks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyArticleFeed);
