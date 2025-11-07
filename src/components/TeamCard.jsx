import React from "react";

export default function TeamCard({ player, team }) {
  // Split name into first and last name
  const nameParts = player.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const jerseyNumber = player.jerseyNumber;

  const positionMap = {
    PG: "GUARD",
    SG: "GUARD",
    SF: "FORWARD",
    PF: "FORWARD",
    C: "CENTER",
    "SG/PG": "GUARD-FORWARD",
    "SG/SF": "GUARD-FORWARD",
  };
  const fullPosition =
    positionMap[player.position] || player.position.toUpperCase();

  const age = player.age || "--";
  const ppg = player.ppg || "--";
  const height = player.height || "--";
  const weight = player.weight || "--";

  // 🟢 ฟังก์ชันเพิ่มผู้เล่นลง Fantasy
  const handleAddPlayer = () => {
    const savedPlayers = JSON.parse(localStorage.getItem("fantasyPlayers")) || [];

    // ถ้ามีผู้เล่นครบ 5 แล้ว ไม่ให้เพิ่ม
    if (savedPlayers.length >= 5) {
      alert("You can only select up to 5 players!");
      return;
    }

    // ถ้ามีผู้เล่นซ้ำ ไม่ให้เพิ่มซ้ำ
    if (savedPlayers.some((p) => p.name === player.name)) {
      alert("This player has already been added!");
      return;
    }

    if (Object.values(player.stats).some(value => value > 0)) {
      alert("You can't select right now!!");
      return;
    }

    // เพิ่มผู้เล่นใหม่
    const updatedPlayers = [...savedPlayers, player];
    localStorage.setItem("fantasyPlayers", JSON.stringify(updatedPlayers));

    alert(`${player.name} added to your Fantasy team!`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden flex h-70 w-80 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Left Section - Stats Column */}
      <div className="flex flex-col w-20 shrink-0">
        <div
          className={`${team?.BG || "bg-gray-400"} flex items-center justify-center h-24 shrink-0`}
        >
          <span className="text-white text-4xl font-bold">{jerseyNumber}</span>
        </div>

        <div className="flex flex-col justify-around flex-1 px-2 py-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">AGE</span>
            <span className="text-sm font-bold text-gray-800">{age}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">PPG</span>
            <span className="text-sm font-bold text-gray-800">{ppg}</span>
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

        <div className="px-4 py-3 bg-white">
          <div className="mb-1">
            <span className="text-sm text-gray-400 uppercase">{firstName}</span>
            <span className="text-2xl font-bold text-gray-700 ml-2 uppercase">
              {lastName}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-700 uppercase">
            {fullPosition}
          </p>

          {/* 🟢 ปุ่ม Add */}
          <button
            onClick={handleAddPlayer}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-lg transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
