import {BiListPlus} from 'react-icons/bi'
import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import ReactContext from '../../ReactContext'
import SavedVideoItem from '../SavedVideoItem'
import './index.css'

const SavedVideos = () => (
  <ReactContext.Consumer>
    {value => {
      const {isLightTheme, savedVideosList} = value

      const bgColor = isLightTheme ? '' : 'dark-container'
      const textColor = isLightTheme ? '' : 'dark-theme-text'
      const headerBgColor = isLightTheme ? '' : 'bgHeaderDarkTheme'
      return (
        <>
          <Navbar />
          <div
            data-testid="saved videos"
            className={`saved-videos-container ${bgColor}`}
          >
            <div className="category-component">
              <CategorySection />
            </div>
            <div className={`trending-videos-container ${bgColor}`}>
              <div className={`trending-header ${headerBgColor}`}>
                <div className={`trending-icon-container ${bgColor}`}>
                  <BiListPlus className="trending-icon" />
                </div>
                <h1 className={`trending-header-text ${textColor}`}>
                  Saved Videos
                </h1>
              </div>
              {savedVideosList.length === 0 ? (
                <div className="failure-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="failure-img"
                  />
                  <h1 className={`failure-heading ${textColor}`}>
                    No saved videos found
                  </h1>
                  <p className="failure-para">
                    You can save your videos while watching them
                  </p>
                </div>
              ) : (
                <ul className="saved-videos">
                  {savedVideosList.map(eachItem => (
                    <SavedVideoItem key={eachItem.id} eachItem={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )
    }}
  </ReactContext.Consumer>
)

export default SavedVideos
