import React from 'react'

import { BlinkApp } from 'blink-npm'
import 'blink-npm/dist/index.css'
const token = ''
const mainRoute = 'https://blink.hackstrap.com/'

const App = () => {
  return (
    <BlinkApp
      userInfo={{ Header: 'Startup 1', accessor: 'investor-1slug' }}
      screen={'investorScreen'}
      view={'homeView'}
      page={'metrics'}
      apiRoute={mainRoute}
      token={token}
    />
  )
}

export default App
