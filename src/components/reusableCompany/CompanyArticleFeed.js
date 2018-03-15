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
      let articleUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com,forbes.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
    fetch(articleUrl)
    .then(response => response.json())
    .then(json => this.setState({
      articles: json.articles.filter((article) => article.title.includes(this.props.company.name) || article.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
    }),
  );
}

addBookmark = (article) => {
  console.log("in PR component")
  console.log(article.title, article.source.name, article.description, article.url, this.props.user.user.id, this.props.company.id)
  this.props.addBookmark(article.title, article.source.name, article.description, article.url, this.props.user.user.id, this.props.company.id)
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
    if (!this.props) {
      return<div>Loading!</div>
    }
    if (!this.state.articles) {
      return<div>Loading..</div>
    }


    return (
      <div>
        {this.state.articles.map((article) => {
          return <div style={{display: "inlineBlock", float:"left", verticalAlign: "top", background:"white", boxShadow:"rgba(0, 0, 0, 0.25) 0px 14px 14px, rgba(0, 0, 0, 0.22) 0px 10px 10px", margin: "1em", padding: "0.25em", height: "150px", width: "360px"}}>

            <span style={{display:"inline", verticalAlign:"top", alignment:"right", margin:"0.1em", color:"#FF5370"}}>

          {this.dynamicBookmarkIcon(article)}


          </span>

          <div><img src={article.urlToImage} style={{maxHeight:"70px", maxWidth:"100px", float:"left", display:"inlineBlock", verticalAlign: "top", padding:"0.25em", margin:"0.25em"}} /></div>

          <div style={{margin:"0.25em", padding:"0.1em", fontSize:"12.5px", fontWeight:"bold", display:"inline",  verticalAlign:"top"}}>{article.source.name}</div>

          <div className="companyPressCardTitle" style={{margin:"0.25em", padding:"0.25em", display:"inlineBlock", verticalAlign:"bottom", textIndent:"0em", fontSize:"13px", fontFamily:"Calibri"}}>
            <a href={article.url} target="_blank">{article.title}</a>
          </div>

          <div className="companyPressCardTitle" style={{fontSize:"12.5px", fontFamily:"Calibri", margin:"0.25em", padding:"0.25em", fontStyle:"italic" }}>Published {new Date(article.publishedAt).toLocaleDateString()}</div>

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
    savedIndustries: state.user.savedIndustries,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyArticleFeed);
