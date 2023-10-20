import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import PlayingVideoItem from './components/PlayingVideoItem'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ReactContext from './ReactContext'
import SavedVideos from './components/SavedVideos'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    activeTab: '',
    isLiked: '',
    isLightTheme: true,
    savedVideosList: [],
    activeLikedVideosList: [],
    activeDislikedVideosList: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({isLightTheme: !prevState.isLightTheme}))
  }

  videoLikedByUser = (id, response) => {
    const {activeLikedVideosList, activeDislikedVideosList} = this.state

    if (
      !activeLikedVideosList.includes(id) &&
      activeDislikedVideosList.includes(id)
    ) {
      this.setState(prevState => ({
        activeLikedVideosList: [...prevState.activeLikedVideosList, id],
      }))
      const filteredList = activeDislikedVideosList.filter(
        eachItem => eachItem !== id,
      )
      this.setState({activeDislikedVideosList: filteredList})
    } else if (
      activeLikedVideosList.includes(id) &&
      !activeDislikedVideosList.includes(id)
    ) {
      this.setState(prevState => ({
        activeDislikedVideosList: [...prevState.activeDislikedVideosList, id],
      }))
      const filteredList = activeLikedVideosList.filter(
        eachItem => eachItem !== id,
      )
      this.setState({activeLikedVideosList: filteredList})
    } else {
      console.log('hello world')
      if (response === 'like') {
        this.setState(prevState => ({
          activeLikedVideosList: [...prevState.activeLikedVideosList, id],
        }))
        const filteredList = activeDislikedVideosList.filter(
          eachItem => eachItem !== id,
        )
        this.setState({activeDislikedVideosList: filteredList})
      } else if (response === 'dislike') {
        this.setState(prevState => ({
          activeDislikedVideosList: [...prevState.activeDislikedVideosList, id],
        }))
        const filteredList = activeLikedVideosList.filter(
          eachItem => eachItem !== id,
        )
        this.setState({activeLikedVideosList: filteredList})
      }
    }
  }

  videoSavedByUser = video => {
    const {savedVideosList} = this.state
    const index = savedVideosList.findIndex(
      eachItem => eachItem.id === video.id,
    )
    if (index === -1) {
      this.setState({savedVideosList: [...savedVideosList, video]})
    } else {
      savedVideosList.splice(index, 1)
      this.setState({savedVideosList})
    }
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const {
      activeTab,
      isLiked,
      isLightTheme,
      savedVideosList,
      activeLikedVideosList,
      activeDislikedVideosList,
    } = this.state

    return (
      <ReactContext.Provider
        value={{
          activeTab,
          changeTab: this.changeTab,
          isLightTheme,
          isLiked,
          savedVideosList,
          activeLikedVideosList,
          activeDislikedVideosList,
          changeTheme: this.changeTheme,
          videoSavedByUser: this.videoSavedByUser,
          videoLikedByUser: this.videoLikedByUser,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={PlayingVideoItem}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
