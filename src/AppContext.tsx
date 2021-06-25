import React, { createContext, useState } from 'react'
interface IProps {
  children: React.ReactNode
  userInfo?: object
  screen?: string
  view?: string
  page?: string
}

interface ValueInterface {
  auth: object | undefined
  setAuth: Function
  setCurrentScreen: Function
  setCurrentView: Function
  setCurrentPage: Function
  currentScreen: string | undefined
  currentView: string | undefined
  currentPage: string | undefined
}
export const globalContext = React.createContext<ValueInterface | null>(null)

const AppContext = (props: IProps) => {
  const [auth, setAuth] = useState<object | undefined>(props.userInfo)
  // const [currentScreen, setCurrentScreen] = useState(
  //   props?.view ? props.view : 'startupScreen'
  // )
  const [currentScreen, setCurrentScreen] = React.useState<string | undefined>(
    props.screen
  )
  const [currentView, setCurrentView] = React.useState<string | undefined>(
    props.view
  )
  const [currentPage, setCurrentPage] = React.useState<string | undefined>(
    props.page
  )
  return (
    <globalContext.Provider
      value={{
        auth,
        setAuth,
        currentScreen,
        setCurrentScreen,
        currentView,
        setCurrentView,
        currentPage,
        setCurrentPage
      }}
    >
      {props.children}
    </globalContext.Provider>
  )
}

export default AppContext
