import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ReactContext from '../../ReactContext'

import './index.css'

const VideoItem = props => {
  const {eachItem} = props
  const {thumbnailUrl, title, publishedAt, channel, viewCount, id} = eachItem
  const publishedTime = formatDistanceToNow(new Date(publishedAt))

  return (
    <ReactContext.Consumer>
      {value => {
        const {isLightTheme} = value
        return (
          <li className="list-item">
            <Link to={`videos/${id}`} className="link-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img"
              />
              <div className="video-bottom-section">
                <img
                  src={channel.profileImageUrl}
                  alt="channel logo"
                  className="profile-img"
                />
                <div>
                  <p
                    className={`video-title ${
                      !isLightTheme && 'text-dark-theme'
                    }`}
                  >
                    {title}
                  </p>
                  <div className="channel-count-container">
                    <div className="channel-name-dot">
                      <p className="name-channel-main">{channel.name}</p>
                      <div className="dot">
                        <BsDot />
                      </div>
                    </div>

                    <div className="view-count-container">
                      <p className="name-channel">{viewCount} views </p>
                      <BsDot />
                      <p className="name-channel">
                        {publishedTime.split(' ')[1]} years ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default VideoItem
