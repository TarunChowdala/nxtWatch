import ReactContext from '../../ReactContext'
import './index.css'

const FailureView = props => {
  const {retryButtonClicked} = props
  const onClickRetry = () => {
    retryButtonClicked()
  }
  return (
    <ReactContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const failureImg = isLightTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        const headingClass = isLightTheme
          ? 'failure-heading'
          : 'failure-heading-dark'
        return (
          <div className="failure-container">
            <img src={failureImg} alt="failure view" className="failure-img" />
            <h1 className={headingClass}>Oops! Something Went Wrong</h1>
            <p className="failure-para">
              We are having some trouble to complete your request. Please try
              again.
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

export default FailureView
