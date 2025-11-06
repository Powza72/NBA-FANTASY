import React from 'react'

const MOCK_PLAYERS = [
  { name: 'JOSH GIDDEY', team: 'Chicago Bulls', points: 23.3, photo: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4871145.png&w=350&h=254',  },
  { name: 'Tyrese Maxey', team: 'Philadelphia 76ers', points: 33.5, photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1630178.png',  },
  { name: 'Devin Booker', team: 'Phoenix Suns', points: 32.5, photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1626164.png',  },
  { name: 'Nikola Jokic', team: 'Denver Nuggets', points: 22.3, photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',  },
  { name: 'Luka Doncic', team: 'Los Angeles Lakers', points: 36.5, photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',  },
]

function Badge({ player, label, size = 'md' }) {
  const avatarSize = size === 'sm' ? 'w-16 h-16 ring-2' : 'w-28 h-28 ring-4'
  const platePad = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'
  const plateText = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const chipSize = size === 'sm' ? 'w-5 h-5 text-[9px]' : 'w-6 h-6 text-[10px]'
  return (
    <div className="relative">
      {/* avatar */}
      <div className={`${avatarSize} rounded-full overflow-hidden ring-white shadow-xl bg-gray-900 flex items-center justify-center`}>
        <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
      </div>
      {/* nameplate */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <div className={`flex items-center bg-white text-gray-900 rounded-full ${platePad} shadow-md border border-gray-200`}>
          <span className={`${plateText} font-extrabold tracking-wide whitespace-nowrap`}>{player.name}</span>
        </div>
      </div>
    </div>
  )
}

function LineupGraphic() {
  // five positions like the reference image
  const spots = [
    { top: '14%', left: '30%', label: 'PG' }, // PG top-left
    { top: '14%', left: '70%', label: 'SG' }, // SG top-right
    { top: '48%', left: '50%', label: 'PF' }, // PF center
    { top: '78%', left: '25%', label: 'SF' }, // SF bottom-left
    { top: '78%', left: '75%', label: 'C' },  // C bottom-right
  ]

  return (
    <div className="relative mx-auto aspect-video w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-[radial-gradient(ellipse_at_center,#274472_0%,#0f1f36_70%)] hidden md:block">
      {/* big faded center circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full border-8 border-white/15" />

      {/* players */}
      {MOCK_PLAYERS.slice(0, 5).map((p, i) => (
        <div key={i} className="absolute" style={{ top: spots[i].top, left: spots[i].left, transform: 'translate(-50%, -50%)' }}>
          <Badge player={p} label={spots[i].label} />
        </div>
      ))}

      {/* bottom bar */}
      <div className="absolute left-3 right-3 bottom-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-slate-900/80 text-white rounded-r-full px-6 py-2 shadow-md">
          <span className="opacity-80 text-lg font-bold">nbadistrict</span>
        </div>
      </div>
    </div>
  )
}

function MobileLineup() {
  const order = [
    { label: 'PG', idx: 0 },
    { label: 'SG', idx: 1 },
    { label: 'PF', idx: 2 },
    { label: 'SF', idx: 3 },
    { label: 'C', idx: 4 },
  ]
  return (
    <div className="md:hidden space-y-6">
      {order.map(({ label, idx }) => (
        <div key={label} className="flex items-center gap-4 bg-slate-900/60 border border-slate-700 rounded-xl p-3">
          <Badge player={MOCK_PLAYERS[idx]} label={label} size="sm" />
          <div className="ml-auto text-right">
            <div className="text-[10px] text-gray-400">POINTS</div>
            <div className="text-white font-bold text-lg">{MOCK_PLAYERS[idx].points}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Players() {
  return (
    <section className="bg-gray-800 min-h-[70vh] text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6">NBA Week 2 <span className='text-amber-300'> Team of the Week</span></h1>
        <LineupGraphic />
        <MobileLineup />
      </div>
    </section>
  )
}

export default Players