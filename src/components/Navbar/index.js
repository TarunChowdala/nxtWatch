import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'
import {AiFillHome, AiOutlineClose} from 'react-icons/ai'
import {HiFire, HiSun} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {withRouter, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {BsJustify} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'
import ReactContext from '../../ReactContext'
import './index.css'

const Navbar = props => (
  <ReactContext.Consumer>
    {value => {
      const {isLightTheme, changeTheme} = value
      const onClickChangeTheme = () => {
        changeTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      const popupBgColor = isLightTheme ? '' : 'bg-popup-dark'
      const textColor = isLightTheme ? '' : 'logout-warning-dark'
      const bgColorLarge = isLightTheme
        ? 'nav-container-large'
        : 'nav-container-large-dark'
      const bgColorSmall = isLightTheme
        ? 'nav-container-small'
        : 'nav-container-small-dark'
      const themeLogo = isLightTheme ? (
        <FaMoon
          className="theme-logo"
          onClick={onClickChangeTheme}
          data-testid="theme"
        />
      ) : (
        <HiSun
          className="theme-logo-dark"
          onClick={onClickChangeTheme}
          data-testid="theme"
        />
      )
      const buttonClass = isLightTheme
        ? 'logout-button-light'
        : 'logout-button-dark'
      const navImage = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      return (
        <>
          <div className={bgColorLarge}>
            <Link to="/" className="link-item">
              <img src={navImage} alt="website-logo" className="nav-logo" />
            </Link>

            <div className="nav-icons-container">
              {themeLogo}
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="nav-logos"
              />
              <Popup
                trigger={
                  <button type="button" className={buttonClass}>
                    Logout
                  </button>
                }
                className="pop-content"
                modal
                role="dialog"
              >
                {close => (
                  <div className={`popup-box ${popupBgColor}`}>
                    <p className={`logout-warning ${textColor}`}>
                      Are you sure you want to logout?
                    </p>
                    <div className="button-container">
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>

          <div className={bgColorSmall}>
            <img src={navImage} alt="website logo" className="nav-logo" />
            <div className="nav-icons-container">
              {themeLogo}
              <Popup
                trigger={
                  <BsJustify
                    className={isLightTheme ? 'theme-logo' : 'theme-logo-dark'}
                  />
                }
                modal
                className="popup-container"
              >
                {close => (
                  <div className="nav-icons-popup-container">
                    <AiOutlineClose
                      onClick={() => close()}
                      className="close-icon"
                    />
                    <div className="category-box nav-category-box">
                      <AiFillHome className="category-icon" />
                      <Link to="/" className="link-item">
                        <p className="category-name">Home</p>
                      </Link>
                    </div>

                    <div className="category-box nav-category-box">
                      <HiFire className="category-icon" />
                      <Link to="/trending" className="link-item">
                        <p className="category-name">Trending</p>
                      </Link>
                    </div>

                    <div className="category-box nav-category-box">
                      <SiYoutubegaming className="category-icon" />
                      <Link to="/gaming" className="link-item">
                        <p className="category-name">Gaming</p>
                      </Link>
                    </div>

                    <div className="category-box nav-category-box">
                      <BiListPlus className="category-icon" />
                      <Link to="/saved-videos" className="link-item">
                        <p className="category-name">Saved Videos</p>
                      </Link>
                    </div>
                  </div>
                )}
              </Popup>

              <Popup
                trigger={
                  <FiLogOut
                    onClick={onClickLogout}
                    className={isLightTheme ? 'theme-logo' : 'theme-logo-dark'}
                  />
                }
                className="pop-content"
                modal
              >
                {close => (
                  <div className={`popup-box ${popupBgColor}`}>
                    <p className={`logout-warning ${textColor}`}>
                      Are you sure you want to logout?
                    </p>
                    <div className="button-container">
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </>
      )
    }}
  </ReactContext.Consumer>
)

export default withRouter(Navbar)
