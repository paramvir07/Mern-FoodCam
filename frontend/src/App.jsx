import Navbar from "./components/navbar"
import './App.css'
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <Navbar/>
      <Outlet />
      
    </>
  )
}

export default App