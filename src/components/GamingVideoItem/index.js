import {Link} from 'react-router-dom'
import ReactContext from '../../ReactContext'
import './index.css'

const GamingVideoItem = props => {
  const {eachItem} = props
  const {thumbnailUrl, title, viewCount, id} = eachItem
  return (
    <ReactContext.Consumer>
      {value => {
        const {isLightTheme} = value
        const textColor = isLightTheme ? '' : 'dark-text'
        return (
          <li className="gaming-video-item">
            <Link to={`videos/${id}`} className="link-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="gaming-img"
              />
              <p className={`game-name ${textColor}`}>{title}</p>
              <p className="game-watching">{viewCount} Watching Worldwide</p>
            </Link>
          </li>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default GamingVideoItem
