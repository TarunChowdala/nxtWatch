import ReactContext from '../../ReactContext'
import './index.css'

const NoSearchResultsView = props => {
  const {retryButtonClicked} = props
  const onClickRetry = () => {
    retryButtonClicked()
  }
  return (
    <ReactContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const textColor = isLightTheme ? '' : 'dark-text'
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="No videos"
              className="failure-img"
            />
            <h1 className={`failure-heading ${textColor}`}>
              No Search results found
            </h1>
            <p className="failure-para">
              Try Different keywords or remove search filter
            </p>
            <button
              className="retry-button"
              type="button"
              onClick={onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default NoSearchResultsView
