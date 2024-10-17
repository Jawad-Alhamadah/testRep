import { RouterProvider } from 'react-router-dom'
import Routers from './Routers/Routers'
import './App.css'

function App() {

  return (
    <>
           <RouterProvider router={Routers}></RouterProvider>

    </>
  )
}

export default App
