import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import TrendingVideoItem from '../TrendingVideoItem'
import FailureView from '../FailureView'
import ReactContext from '../../ReactContext'

import './index.css'

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: 'initial'}

  componentDidMount = () => {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      this.setState({trendingVideos: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state

    return (
      <ul className="trending-videos-list">
        {trendingVideos.map(eachItem => (
          <TrendingVideoItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  retryButtonClicked = () => {
    this.setState({apiStatus: 'initial'}, this.getTrendingVideos)
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
        renderedItem = this.renderTrendingVideos()
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
                data-testid="trending"
                className={`trending-container ${bgColor}`}
              >
                <div className="category-component">
                  <CategorySection />
                </div>
                <div className={`trending-videos-container ${bgColor}`}>
                  <div className={`trending-header ${headerBgColor}`}>
                    <div className={`trending-icon-container ${bgColor}`}>
                      <HiFire className="trending-icon" />
                    </div>
                    <h1 className={`trending-header-text ${textColor}`}>
                      Trending
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

export default Trending
