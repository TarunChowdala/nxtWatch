import Navbar from '../Navbar'
import CategorySection from '../CategorySection'
import ReactContext from '../../ReactContext'

import './index.css'

const NotFound = () => (
  <ReactContext.Consumer>
    {value => {
      const {isLightTheme} = value
      const bgColor = isLightTheme ? '' : 'bg-container-dark'
      const img = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      const bgText = isLightTheme ? '' : 'bg-text-dark'
      return (
        <>
          <Navbar />
          <div className="trending-container">
            <div className="category-component">
              <CategorySection />
            </div>
            <div className={`not-found-container ${bgColor}`}>
              <img src={img} alt="not found" className="not-found-img" />
              <h1 className={`${bgText} not-found-heading`}>Page Not Found</h1>
              <p className="not-found-para">
                we are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </>
      )
    }}
  </ReactContext.Consumer>
)

export default NotFound
