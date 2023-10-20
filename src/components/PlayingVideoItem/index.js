import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import FailureView from '../FailureView'
import ReactContext from '../../ReactContext'
import ReactPlayerComponent from './ReactPlayerComponent'

import './index.css'

class PlayingVideoItem extends Component {
  state = {videoData: [], apiStatus: 'initial'}

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/videos/${id}`
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
      const formattedData = {
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        publishedAt: fetchedData.video_details.published_at,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        title: fetchedData.video_details.title,
        videoUrl: fetchedData.video_details.video_url,
        viewCount: fetchedData.video_details.view_count,
      }
      this.setState({videoData: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failed'})
    }
  }

  renderVideo = () => {
    const {videoData} = this.state
    return <ReactPlayerComponent videoData={videoData} />
  }

  renderFailureView = () => <FailureView />

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
        renderedItem = this.renderVideo()
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
          const bgColor = isLightTheme ? '' : 'video-container-dark'

          return (
            <>
              <Navbar />
              <div className="playing-video-container">
                <div className="category-component">
                  <CategorySection />
                </div>
                <div className={`video ${bgColor}`}>{renderedItem}</div>
              </div>
            </>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default PlayingVideoItem
