import * as React from 'react'
// import styles from './styles.module.css'
import App from './App'
import AppContext from './AppContext'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { defaultTheme as theme } from './theme'

interface Props {
  userInfo: {
    Header: string
    accessor: string
  }
  screen: string
  view: string
  page: string
  apiRoute: string
  token: string
}

export const BlinkApp = ({
  userInfo,
  screen,
  view,
  page,
  apiRoute,
  token
}: Props) => {
  return (
    <AppContext
      userInfo={userInfo}
      screen={screen}
      view={view}
      page={page}
      apiRoute={apiRoute}
      token={token}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppContext>
  )
}
