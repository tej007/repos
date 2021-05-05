import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

// Write your code here

class GithubPopularRepos extends Component {
  state = {isLoading: true, repositoriesData: [], selectedLanguageFilter: 'ALL'}

  componentDidMount = () => {
    const {languageFiltersData} = this.props
    this.getReposData(languageFiltersData[0].id)
  }

  getReposData = async () => {
    this.setState({isLoading: true})
    const {selectedLanguageFilter} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language='${selectedLanguageFilter}'`,
    )
    const fetchedData = response.json()
    console.log(fetchedData)

    const updatedData = fetchedData.popular_repos.map(eachRepository => ({
      id: eachRepository.id,
      imageUrl: eachRepository.avatar_url,
      name: eachRepository.name,
      starsCount: eachRepository.stars_count,
      forksCount: eachRepository.forks_count,
      issuesCount: eachRepository.issues_count,
    }))
    this.setState({isLoading: false, repositoriesData: updatedData})
  }

  renderReposoteryList = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-cards-list-container">
        {repositoriesData.map(eachList => (
          <RepositoryItem repositoriesData={eachList} key={eachList.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  setSelectedLanguageFilterAndGetRepositories = newFilter => {
    this.setState({selectedLanguageFilter: newFilter})
    this.getReposData(newFilter)
  }

  renderLanguageFilterItems = () => {
    const {selectedLanguageFilter} = this.state
    const {languageFiltersData} = this.props
    return (
      <ul className="">
        {languageFiltersData.map(language => (
          <LanguageFilterItem
            isSelected={selectedLanguageFilter === language.id}
            languageFilter={language}
            setSelectedLanguageFilterAndGetRepositories={
              this.setSelectedLanguageFilterAndGetRepositories
            }
          />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="github-popular-repositories-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterItems()}
          {isLoading ? this.renderLoader() : this.renderRepositoriesList()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
