import './css/App.css'
import { useState } from "react";
import { useLocation } from "react-router-dom"

import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
function App() {
  
  const [homeKey, setHomeKey] = useState(0);
  const resetHome = () => setHomeKey(prev => prev + 1);

  return (
    <MovieProvider>
      <NavBar resetHome={resetHome}/>
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home key={homeKey} />}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
    </main>
    </MovieProvider>
    
  )
}

export default App
