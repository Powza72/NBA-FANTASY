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

  const filteredTeams = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        (t.name || t.team || "").toLowerCase().includes(q) ||
        (t.abbr || "").toLowerCase().includes(q)
    );
  }, [query, teams]);

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
    <section id="teams" className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredTeams.map((team) => (
            <button
              key={team.abbr || team.name}
              onClick={() => handlePick(team)}
              className="group bg-gray-900 border border-gray-700 rounded-xl p-4 text-left hover:border-yellow-400 transition flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-yellow-400 overflow-hidden">
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

              <div>
                <div className="text-sm font-semibold">
                  {team.name || team.team}
                </div>
                <div className="text-xs text-gray-400">Tap to select</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
