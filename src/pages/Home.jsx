import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}

function Home() {
  return (
    <section id="home" className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Reveal>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              Welcome to <span className="text-yellow-400">NBA Fantasy</span>
            </h1>
            <p className="text-gray-300 mb-6">
              Build your dream team, track real game stats, and compete with friends.
              Points update based on real NBA performances.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h2 className="text-xl font-bold mb-2 text-yellow-400">Quick Start</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
                  Choose players for each position: PG, SG, SF, PF, C.
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
                  Stay under the salary cap if enabled in your league.
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
                  Earn points from real stats: PTS, REB, AST, STL, BLK. Turnovers subtract.
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
                  Set your lineup before games start and track live scoring.
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-xl bg-gray-900 border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Scoring Example</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>Point: +1</li>
                <li>Rebound: +1.2</li>
                <li>Assist: +1.5</li>
                <li>Steal: +3</li>
                <li>Block: +3</li>
                <li>Turnover: -1</li>
              </ul>
              <p className="mt-4 text-xs text-gray-400">Scoring can vary by league. This is a common default.</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Reveal>
          <Link to="/team" className="hover:text-yellow-400 transition">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:border-yellow-400 transition">
          
            <h4 className="font-bold mb-2 text-yellow-400">Draft Players</h4>
            <p className="text-gray-300 text-sm">Search players and add them to your roster while minding positions.</p>
            </div>
            </Link>
          </Reveal>
          <Reveal delay={120}>
          <Link to="/players" className="hover:text-yellow-400 transition">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:border-yellow-400 transition">
            <h4 className="font-bold mb-2 text-yellow-400">Team of the Week</h4>
            <p className="text-gray-300 text-sm">Set your lineup, watch the games, and dominate the week.</p>
            </div>
          </Link>
          </Reveal>
          <Reveal delay={240}>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-5 hover:border-yellow-400 transition">
            <h4 className="font-bold mb-2 text-yellow-400">Track Scores</h4>
            <p className="text-gray-300 text-sm">We update during games so you can follow your team live.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Home


