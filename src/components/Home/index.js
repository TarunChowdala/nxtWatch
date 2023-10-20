import {Component} from 'react'
import {BsX, BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import CategorySection from '../CategorySection'
import Navbar from '../Navbar'
import VideoItem from '../VideoItem'
import FailureView from '../FailureView'
import ReactContext from '../../ReactContext'
import './index.css'
import NoSearchResultsView from '../NoSearchResultsView'

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: 'initial',
    searchInput: '',
    displayBanner: true,
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      this.setState({videosList: formattedData, apiStatus: 'success'})
      this.renderVideosList()
    } else {
      this.setState({apiStatus: 'failed'}, this.renderFailureView)
    }
  }

  retryButtonClicked = () => {
    this.setState({apiStatus: 'initial'}, this.getVideosData)
  }

  renderFailureView = () => (
    <FailureView retryButtonClicked={this.retryButtonClicked} />
  )

  renderSearchResultsEmpty = () => (
    <NoSearchResultsView retryButtonClicked={this.retryButtonClicked} />
  )

  renderVideosList = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return this.renderSearchResultsEmpty()
    }
    return (
      <ul className="videos-list">
        {videosList.map(eachItem => (
          <VideoItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#475569" height="50" width="50" />
    </div>
  )

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getVideosData)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getVideosData()
  }

  onRemoveBanner = () => {
    this.setState({displayBanner: false})
  }

  render() {
    const {apiStatus, displayBanner} = this.state
    let renderedItem
    switch (apiStatus) {
      case 'success':
        renderedItem = this.renderVideosList()
        break
      case 'failed':
        renderedItem = this.renderFailureView()
        break
      default:
        renderedItem = this.renderLoader()
    }

    const bannerClassName = displayBanner
      ? 'popup-image-container'
      : 'remove-banner'

    return (
      <ReactContext.Consumer>
        {value => {
          const {isLightTheme} = value

          return (
            <>
              <Navbar />
              <div
                data-testid="home"
                className={
                  isLightTheme ? 'home-container' : 'home-container-dark'
                }
              >
                <div className="category-component">
                  <CategorySection />
                </div>
                <div className="videos-container">
                  <div className={bannerClassName} data-testid="banner">
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                        className="website-logo"
                      />
                      <p className="popup-description">
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <button type="button" className="get-now-button">
                        GET IT NOW
                      </button>
                    </div>
                    <BsX
                      className="remove-icon"
                      onClick={this.onRemoveBanner}
                      data-testid="close"
                    />
                  </div>
                  <div className={isLightTheme ? 'videos' : 'videos-dark'}>
                    <div
                      className={`search-input-container ${
                        !isLightTheme && 'search-input-dark'
                      }`}
                    >
                      <input
                        type="search"
                        className={`search-input ${
                          !isLightTheme && 'search-input-dark'
                        }`}
                        placeholder="Search"
                        onKeyDown={this.onKeyDownSearchInput}
                        onChange={this.onChangeSearchInput}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        className="icon-container"
                        onClick={this.onClickSearch}
                      >
                        <BsSearch className="icon" />
                      </button>
                    </div>
                    {renderedItem}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Home
