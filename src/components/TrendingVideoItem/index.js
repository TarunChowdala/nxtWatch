import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ReactContext from '../../ReactContext'

import './index.css'

const TrendingVideoItem = props => {
  const {eachItem} = props
  const {thumbnailUrl, title, publishedAt, channel, viewCount, id} = eachItem
  const publishedTime = formatDistanceToNow(new Date(publishedAt))

  return (
    <ReactContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const textColor = isLightTheme ? '' : 'dark-theme-text'

        return (
          <Link to={`videos/${id}`} className="link-item">
            <li className="trending-list-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="trending-thumbnail-img"
              />

              <div className="video-bottom-section">
                <img
                  src={channel.profileImageUrl}
                  alt="profile"
                  className="profile-img"
                />
                <div>
                  <p className={`trending-video-title ${textColor}`}>{title}</p>
                  <div className="channel-count-container">
                    <div className="channel-name-dot">
                      <p className="trending-channel-name">{channel.name}</p>
                      <div className="dot">
                        <BsDot />
                      </div>
                    </div>

                    <div className="view-count-container">
                      <p className="trending-channel-name">
                        {viewCount} views{' '}
                      </p>
                      <BsDot />
                      <p className="trending-channel-name">
                        {publishedTime.split(' ')[1]} years ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default TrendingVideoItem
