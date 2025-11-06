import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import TeamCard from '../components/TeamCard'

function TeamDetail() {
  const { abbr } = useParams()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/team.json')
      .then(r => r.json())
      .then(data => {
        setTeams(data.teams || [])
        setLoading(false)
      })
      .catch(e => {
        setError('Failed to load team data')
        setLoading(false)
      })
  }, [])

  const team = useMemo(() => {
    const key = (abbr || '').toUpperCase()
    return teams.find(t => (t.abbr || '').toUpperCase() === key)
  }, [teams, abbr])

  if (loading) return <div className="container mx-auto px-4 py-8 text-white">Loading…</div>
  if (error) return <div className="container mx-auto px-4 py-8 text-red-400">{error}</div>
  if (!team) return <div className="container mx-auto px-4 py-8 text-yellow-400">Team not found.</div>

  return (
    <section className="bg-gray-800 text-white min-h-[60vh]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6">
          {team.name || team.team}
          <span className="ml-3 text-yellow-400 text-base">({team.abbr})</span>
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(team.players || []).map((player, i) => (
            <TeamCard key={i} player={player} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamDetail


