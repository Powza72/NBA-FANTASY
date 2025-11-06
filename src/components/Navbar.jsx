// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">NBA Fantasy</div>

        {/* Menu (Desktop) */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
          <li><Link to="/team" className="hover:text-yellow-400 transition">Teams</Link></li>
          <li><Link to="/players" className="hover:text-yellow-400 transition">Team of the Week</Link></li>
          <li><Link to="/fantasy" className="hover:text-yellow-400 transition">Fantasy</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              // ปุ่ม X ปิดเมนู
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // ปุ่ม ☰ เปิดเมนู
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/team" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition">Teams</Link></li>
            <li><Link to="/players" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition">Team of the Week</Link></li>
            <li><Link to="/fantasy" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 transition">Fantasy</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
