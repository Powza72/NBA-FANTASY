import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Players from './pages/Players'
import Home from './pages/Home'
import Team from './pages/Team'
import TeamDetail from './pages/TeamDetail'
import Fantasy from './pages/Fantasy'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-700">
      <Navbar className=" top-0 z-50" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:abbr" element={<TeamDetail />} />
          <Route path="/players" element={<Players />} />
          <Route path="/Fantasy" element={<Fantasy/>}/>
        </Routes>
        
      </div>
    </Router>
  )
}

export default App
