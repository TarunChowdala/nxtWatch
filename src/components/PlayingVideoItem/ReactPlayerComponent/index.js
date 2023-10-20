import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import ReactContext from '../../../ReactContext'
import './index.css'

const ReactPlayerComponent = props => {
  const {videoData} = props
  const {
    id,
    publishedAt,
    title,
    videoUrl,
    viewCount,
    description,
    channel,
  } = videoData
  const publishedTime = formatDistanceToNow(new Date(publishedAt))

  return (
    <ReactContext.Consumer>
      {value => {
        const {
          isLightTheme,
          videoSavedByUser,
          videoLikedByUser,

          activeLikedVideosList,
          activeDislikedVideosList,
          savedVideosList,
        } = value

        const likeClassName = activeLikedVideosList.includes(id)
          ? 'liked-icons'
          : ''
        const dislikeClassName = activeDislikedVideosList.includes(id)
          ? 'liked-icons'
          : ''
        let isSaved
        const index = savedVideosList.findIndex(
          eachVideo => eachVideo.id === videoData.id,
        )
        if (index === -1) {
          isSaved = false
        } else {
          isSaved = true
        }
        const saveClassName = isSaved ? 'liked-icons' : ''

        const textColor = isLightTheme ? '' : 'dark-theme-text'

        const onClickSave = () => {
          videoSavedByUser(videoData)
        }
        const onClickLike = () => {
          videoLikedByUser(id, 'like')
        }

        const onClickDislike = () => {
          videoLikedByUser(id, 'dislike')
        }

        return (
          <>
            <div className="video-player">
              <ReactPlayer
                url={videoUrl}
                controls="true"
                width="100%"
                height="100%"
              />

              <div className="video-details-container">
                <p className={`${textColor} title-name`}>{title}</p>
                <div className="views-like-container">
                  <div className="view-count-container">
                    <p className="video-views">{viewCount} views </p>
                    <BsDot />
                    <p className="video-views">
                      {publishedTime.split(' ')[1]} years ago
                    </p>
                  </div>
                  <div className="like-dislike-save-container">
                    <button type="button" className="like-box">
                      <BiLike
                        className={`${likeClassName} like-icon`}
                        onClick={onClickLike}
                      />
                      <p
                        className={`like-text ${likeClassName}`}
                        onClick={onClickLike}
                      >
                        Like
                      </p>
                    </button>
                    <button type="button" className="like-box">
                      <BiDislike
                        className={`unlike-icon ${dislikeClassName}`}
                        onClick={onClickDislike}
                      />
                      <p
                        onClick={onClickDislike}
                        className={`like-text ${dislikeClassName}`}
                      >
                        Dislike
                      </p>
                    </button>
                    <button type="button" className="like-box">
                      <BiListPlus
                        className={`save-icon ${saveClassName}`}
                        onClick={onClickSave}
                      />
                      <p
                        onClick={onClickSave}
                        className={`like-text ${saveClassName}`}
                      >
                        Save
                      </p>
                    </button>
                  </div>
                </div>
                <hr />
                <div className="video-description">
                  <img
                    src={channel.profileImageUrl}
                    alt="channel-logo"
                    className="profile-img"
                  />
                  <div>
                    <p className={`${textColor} channel-name-light`}>
                      {channel.name}
                    </p>
                    <p className="subscribers-count">
                      {channel.subscriberCount} subscribers
                    </p>
                    <p className="description">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default ReactPlayerComponent
