import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home'
import PostTraditional from './components/postTraditrional'
function App() {

  return (
    <div>
      <Home></Home>
      <PostTraditional></PostTraditional>
    </div>
  )
}

export default App
