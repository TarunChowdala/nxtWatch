import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import GamingVideoItem from '../GamingVideoItem'
import FailureView from '../FailureView'
import ReactContext from '../../ReactContext'

import './index.css'

class Gaming extends Component {
  state = {GamingVideos: [], apiStatus: 'initial'}

  componentDidMount = () => {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedData = fetchedData.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({GamingVideos: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderGamingVideos = () => {
    const {GamingVideos} = this.state
    return (
      <ul className="gaming-videos-list">
        {GamingVideos.map(eachItem => (
          <GamingVideoItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  retryButtonClicked = () => {
    this.setState({apiStatus: 'initial'}, this.getGamingVideos)
  }

  renderFailureView = () => (
    <FailureView retryButtonClicked={this.retryButtonClicked} />
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#475569" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let renderedItem
    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderGamingVideos()
        break
      case 'failed':
        renderedItem = this.renderFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }

    return (
      <ReactContext.Consumer>
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? '' : 'dark-container'
          const textColor = isLightTheme ? '' : 'dark-theme-text'
          const headerBgColor = isLightTheme ? '' : 'bgHeaderDarkTheme'
          return (
            <>
              <Navbar />
              <div
                data-testid="gaming"
                className={`trending-container ${bgColor}`}
              >
                <div className="category-component">
                  <CategorySection />
                </div>
                <div className={`trending-videos-container ${bgColor}`}>
                  <div className={`trending-header ${headerBgColor}`}>
                    <div className={`trending-icon-container ${bgColor}`}>
                      <SiYoutubegaming className="trending-icon" />
                    </div>
                    <h1 className={`trending-header-text ${textColor}`}>
                      Gaming
                    </h1>
                  </div>
                  {renderedItem}
                </div>
              </div>
            </>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Gaming
