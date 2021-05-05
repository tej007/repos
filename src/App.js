import './App.css'

import GithubPopularRepos from './components/GithubPopularRepos'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const App = () => (
  <GithubPopularRepos languageFiltersData={languageFiltersData} />
)

export default App
