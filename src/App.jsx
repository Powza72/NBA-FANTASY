import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Players from './pages/Players'
import Home from './pages/Home'
import Team from './pages/Team'
import TeamDetail from './pages/TeamDetail'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-700">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:abbr" element={<TeamDetail />} />
          <Route path="/players" element={<Players />} />
        </Routes>
        
      </div>
    </Router>
  )
}

export default App
