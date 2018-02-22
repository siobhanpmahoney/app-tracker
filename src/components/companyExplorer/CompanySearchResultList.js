import React from 'react'
import CompanySearchResultItem from './CompanySearchResultItem'

const CompanySearchResultList = ({companySearchResults}) => {
  return(
    <div>
      {companySearchResults.map((company) => {
        return <CompanySearchResultItem company={company} key={company.id} />
      })}
    </div>
  )
}

export default CompanySearchResultList
