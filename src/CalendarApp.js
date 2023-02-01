import React from 'react'
import { HashRouter } from 'react-router-dom'
import { AppRouter } from './routers/AppRouter'
import { Provider } from 'react-redux'
import store from './redux/store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>


  )
}
