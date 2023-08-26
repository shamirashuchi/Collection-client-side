import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Incomplete from './Component/Incomplete'
import Todo from './Component/Todo'
import Doing from './Component/Doing'
import Review from './Component/Review'
import Complete from './Component/Complete'
import Over from './Component/Over'

function App() {
//0070bd
  return (
    <div className='grid grid-cols-6 gap-5 w-screen overflow-x-scroll'>
      <Incomplete></Incomplete>
      <Todo></Todo>
      <Doing></Doing>
      <Review></Review>
      <Complete></Complete>
      <Over></Over>
    </div>
  )
}

export default App
