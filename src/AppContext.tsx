import React, { createContext, useState } from 'react'
import { OptionInterface } from './Components/interfaces'
interface IProps {
  children: React.ReactNode
  userInfo: OptionInterface
  screen?: string
  view?: string
  page?: string
  token?: string
  apiRoute?: string
}

interface ValueInterface {
  // auth: object | undefined;
  // setAuth: Function;
  userInfo: OptionInterface | undefined
  setCurrentScreen: Function
  setCurrentView: Function
  setCurrentPage: Function
  currentScreen: string | undefined
  currentView: string | undefined
  currentPage: string | undefined
  token: string | undefined
  apiRoute: string | undefined
  snackbarState: {
    open: boolean
    message: string
  }
  setSnackbarState: Function
}
export const globalContext = React.createContext<ValueInterface | null>(null)

const AppContext = (props: IProps) => {
  const [userInfo, setUserInfo] = useState<OptionInterface | undefined>(
    props.userInfo
  )

  const [currentScreen, setCurrentScreen] = React.useState<string | undefined>(
    props.screen
  )
  const [currentView, setCurrentView] = React.useState<string | undefined>(
    props.view
  )
  const [token, setToken] = React.useState<string | undefined>(props.token)

  const [apiRoute, setApiRoute] = React.useState<string | undefined>(
    props.apiRoute
  )

  const [currentPage, setCurrentPage] = React.useState<string | undefined>(
    props.page
  )

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    message: ''
  })

  React.useEffect(() => {
    setCurrentScreen(props.screen)
    setCurrentView(props.view)
    setCurrentPage(props.page)
  }, [props])
  return (
    <globalContext.Provider
      value={{
        userInfo,
        currentScreen,
        setCurrentScreen,
        currentView,
        setCurrentView,
        currentPage,
        setCurrentPage,
        apiRoute,
        token,
        snackbarState,
        setSnackbarState
      }}
    >
      {props.children}
    </globalContext.Provider>
  )
}

export default AppContext
