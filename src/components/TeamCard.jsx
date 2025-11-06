// TeamCard.jsx
export default function TeamCard({ player }) {
  // Split name into first and last name
  const nameParts = player.name.split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''
  
  // Generate jersey number from name hash (or use player.jerseyNumber if available)
  const jerseyNumber = player.jerseyNumber
  
  // Map position abbreviations to full names
  const positionMap = {
    'PG': 'GUARD',
    'SG': 'GUARD',
    'SF': 'FORWARD',
    'PF': 'FORWARD',
    'C': 'CENTER',
    'SG/PG': 'GUARD-FORWARD',
    'SG/SF': 'GUARD-FORWARD'
  }
  const fullPosition = positionMap[player.position] || player.position.toUpperCase()
  
  // Placeholder stats (can be replaced with actual data when available)
  const age = player.age || '--'
  const ppg = player.ppg || '--'
  const height = player.height || '--'
  const weight = player.weight || '--'

  return (
    <div className="bg-white rounded-xl overflow-hidden flex h-70 w-80 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Left Section - Stats Column */}
      <div className="flex flex-col w-20 shrink-0">
        {/* Yellow Jersey Number Block */}
        <div className="bg-yellow-400   flex items-center justify-center h-24 shrink-0">
          <span className="text-white text-4xl font-bold">{jerseyNumber}</span>
        </div>
        
        {/* Stats List */}
        <div className="flex flex-col justify-around flex-1 px-2 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">AGE</span>
            <span className="text-sm font-bold text-gray-800">{age}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">PPG</span>
            <span className="text-sm font-bold text-gray-800">{ppg} </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">HT</span>
            <span className="text-sm font-medium text-gray-800">{height}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">WT</span>
            <span className="text-sm font-medium text-gray-800">{weight}</span>
          </div>
        </div>
      </div>

      {/* Right Section - Player Image & Info */}
      <div className="flex flex-col flex-1">
        {/* Player Image */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <img
            src={
              player.img ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                player.name
              )}&background=0D5EAF&color=fff&size=256`
            }
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Player Name and Position */}
        <div className="px-4 py-3 bg-white">
          <div className="mb-1">
            <span className="text-sm text-gray-400 uppercase">{firstName}</span>
            <span className="text-2xl font-bold  text-gray-700 ml-2 uppercase">{lastName}</span>
          </div>
          <p className="text-xs text-gray-400 uppercase">{fullPosition}</p>
        </div>
      </div>
    </div>
  )
}
