import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <div className="app flex flex-col w-full min-h-screen">
        <Outlet />
      </div>
    </Provider>
  )
}

export default App
