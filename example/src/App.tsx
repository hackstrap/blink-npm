import React from 'react'

import { BlinkApp } from 'blink-npm'
import 'blink-npm/dist/index.css'

const App = () => {
  return (
    <BlinkApp
      screen={'startupScreen'}
      view={'homeView'}
      page={'metrics'}
      apiRoute={''}
      token={''}
    />
  )
}

export default App
