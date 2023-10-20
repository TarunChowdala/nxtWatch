import React from 'react'

const ReactContext = React.createContext({
  activeTab: '',
  changeTab: () => {},
  isLightTheme: true,
  changeTheme: () => {},
  savedVideosList: [],
  isLiked: '',
  activeLikedVideosList: [],
  activeDislikedVideosList: [],
  videoSavedByUser: () => {},
  videoLikedByUser: () => {},
})

export default ReactContext
