import React from 'react'

import { BlinkApp } from 'blink-npm'
import 'blink-npm/dist/index.css'
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJoYWNrc3RyYXAiLCJhdWRpZW5jZSI6Imh0dHBzOi8vaGFja3N0cmFwLmNvbSIsImFsZ29yaXRobXMiOlsiSFMyNTYiXSwiY2xhaW1zIjp7Im9yZyI6ImhhY2tzdHJhcCJ9LCJpYXQiOjE2MjQ3ODkwNTd9.Dmo2eZKUtAOD7o7UPopoKRgma2jbESyYos8HKdU_tXk`
const mainRoute = 'https://blink.hackstrap.com/'

const App = () => {
  return (
    <BlinkApp
      userInfo={{ Header: 'Startup 1', accessor: 'startup-1slug' }}
      screen={'startupScreen'}
      view={'homeView'}
      page={'metrics'}
      apiRoute={mainRoute}
      token={token}
    />
  )
}

export default App
