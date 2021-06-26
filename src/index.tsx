import * as React from 'react'
// import styles from './styles.module.css'
import App from './App'
import AppContext from './AppContext'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { defaultTheme as theme } from './theme'

interface Props {
  screen: string
  view: string
  page: string
}

export const BlinkApp = ({ screen, view, page }: Props) => {
  return (
    <AppContext screen={screen} view={view} page={page}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppContext>
  )
}
