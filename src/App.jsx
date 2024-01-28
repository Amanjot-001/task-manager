import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './components/Home'
import Register from './components/Register'

function App() {
  return (
    <Provider store={store}>
      <div className="app flex flex-col w-full min-h-screen">
        {/* <Register /> */}
        <Home />
      </div>
    </Provider>
  )
}

export default App
