import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function useTeams() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("/team.json")
      .then((r) => r.json())
      .then((data) => setTeams(data.teams || []))
      .catch(() => setTeams([]));
  }, []);
  return teams;
}

function Team({ onSelect }) {
  const navigate = useNavigate();
  const teams = useTeams();
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState(() => {
    try {
      return localStorage.getItem("selectedTeam") || "";
    } catch {
      return "";
    }
  });

  // filter ตาม search
  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        (t.name || t.team || "").toLowerCase().includes(q) ||
        (t.abbr || "").toLowerCase().includes(q)
    );
  }, [query, teams]);

  // เลือกทีม
  const handlePick = (team) => {
    setChosen(team.name);
    try {
      localStorage.setItem("selectedTeam", team.name);
      localStorage.setItem("selectedTeamAbbr", team.abbr);
    } catch {}
    if (onSelect) onSelect(team);
    if (team.abbr) navigate(`/team/${team.abbr}`);
  };

  return (
    <section id="teams" className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">Select Team</h1>
          <div className="flex-1 md:max-w-sm">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teams..."
              className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {chosen && (
          <div className="mb-4 text-sm text-gray-300">
            Selected:{" "}
            <span className="text-yellow-400 font-semibold">{chosen}</span>
          </div>
        )}

        {/* Grid ทีม */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTeams.map((team) => {
            // คำนวณ average ของแต่ละทีม
            const avg =
              team.players && team.players.length > 0
                ? (
                    team.players.reduce(
                      (sum, p) => sum + (p.price || 0),
                      0
                    ) / team.players.length
                  ).toFixed(1)
                : 0;

            const isChosen = chosen === (team.name || team.team);

            return (
              <button
                key={team.abbr || team.name}
                onClick={() => handlePick(team)}
                className={`group flex flex-col items-start bg-gray-900 border rounded-xl p-4 text-left transition gap-3
                  ${isChosen ? "border-yellow-400" : "border-gray-700"}
                  hover:border-yellow-400`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border overflow-hidden">
                  {team.logo ? (
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-yellow-400 text-sm font-bold">
                      {team.abbr || "?"}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    {team.name || team.team}
                  </div>
                  <div className="text-xs text-gray-400">Tap to select</div>
                  <div className="text-xs text-gray-300 mt-1">
                  Average Player Price = <span className="text-yellow-300 font-bold"> {avg}</span> M
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Team;
