import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import ReactContext from '../../ReactContext'
import './index.css'

const CategorySection = () => (
  <ReactContext.Consumer>
    {value => {
      const {isLightTheme, changeTab, activeTab} = value

      const onClickHome = () => {
        changeTab('HOME')
      }

      const onClickTrending = () => {
        changeTab('TRENDING')
      }

      const onClickGaming = () => {
        changeTab('GAMING')
      }

      const onClickSavedVideos = () => {
        changeTab('SAVED-VIDEOS')
      }

      console.log(activeTab)
      return (
        <div
          className={
            isLightTheme ? 'category-container' : 'category-container-dark'
          }
        >
          <div className="category-item-container">
            <div
              className={activeTab === 'HOME' ? 'active-tab' : 'category-box'}
            >
              <AiFillHome
                className={
                  isLightTheme ? 'category-icon' : 'category-icon-dark'
                }
              />
              <Link to="/" className="link-item" onClick={onClickHome}>
                <p
                  className={
                    isLightTheme ? 'category-name' : 'category-name-dark'
                  }
                >
                  Home
                </p>
              </Link>
            </div>

            <div
              className={
                activeTab === 'TRENDING' ? 'active-tab' : 'category-box'
              }
            >
              <HiFire
                className={
                  isLightTheme ? 'category-icon' : 'category-icon-dark'
                }
              />
              <Link
                to="/trending"
                className="link-item"
                onClick={onClickTrending}
              >
                <p
                  className={
                    isLightTheme ? 'category-name' : 'category-name-dark'
                  }
                >
                  Trending
                </p>
              </Link>
            </div>

            <div
              className={activeTab === 'GAMING' ? 'active-tab' : 'category-box'}
            >
              <SiYoutubegaming
                className={
                  isLightTheme ? 'category-icon' : 'category-icon-dark'
                }
              />
              <Link to="/gaming" className="link-item" onClick={onClickGaming}>
                <p
                  className={
                    isLightTheme ? 'category-name' : 'category-name-dark'
                  }
                >
                  Gaming
                </p>
              </Link>
            </div>

            <div
              className={
                activeTab === 'SAVED-VIDEOS' ? 'active-tab' : 'category-box'
              }
            >
              <BiListPlus
                className={
                  isLightTheme ? 'category-icon' : 'category-icon-dark'
                }
              />
              <Link
                to="/saved-videos"
                className="link-item"
                onClick={onClickSavedVideos}
              >
                <p
                  className={
                    isLightTheme ? 'category-name' : 'category-name-dark'
                  }
                >
                  Saved Videos
                </p>
              </Link>
            </div>
          </div>
          <div className="category-description-container">
            <p className={isLightTheme ? 'contact-us-text' : 'contact-us-dark'}>
              CONTACT US
            </p>
            <div className="social-media-icons-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-media-icons"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-media-icons"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-media-icons"
              />
              <p className={isLightTheme ? 'para-text' : 'para-dark'}>
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </ReactContext.Consumer>
)

export default CategorySection
