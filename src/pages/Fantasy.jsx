import React, { useEffect, useState } from "react";

export default function Fantasy() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fantasyPlayers")) || [];
    setPlayers(saved);
  }, []);

  // 🟢 ลบผู้เล่นรายคน
  const handleRemovePlayer = (name) => {
    const updated = players.filter((p) => p.name !== name);
    setPlayers(updated);
    localStorage.setItem("fantasyPlayers", JSON.stringify(updated));
  };

  // 🟢 รีเซ็ตทีมทั้งหมด
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your fantasy team?")) {
      setPlayers([]);
      localStorage.removeItem("fantasyPlayers");
    }
  };

  // 🧮 คำนวณ Fantasy Points จาก p.stats
  const calculateFantasyPoints = (p) => {
    if (!p.stats) return 0;
    const { points = 0, rebounds = 0, assists = 0, steals = 0, blocks = 0, turnovers = 0 } = p.stats;

    return (
      points * 1 +
      rebounds * 1.2 +
      assists * 1.5 +
      steals * 3 +
      blocks * 3 +
      turnovers * -1
    ).toFixed(1);
  };

  // รวมคะแนนทั้งหมดของทีม
  const totalPoints = players
    .reduce((sum, p) => sum + parseFloat(calculateFantasyPoints(p) || 0), 0)
    .toFixed(1);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-amber-300 font-bold text-center flex-1">
          My Fantasy Team
        </h1>

        {players.length > 0 && (
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
          >
            Reset Team
          </button>
        )}
      </div>

      {/* รวมคะแนนทีม */}
      {players.length > 0 && (
        <div className="text-center mb-6 flex justify-center">
          <p className="text-lg font-semibold text-red-700">
            Total Fantasy Points:
            <span className="text-blue-600 ml-2 text-2xl font-bold">
              {totalPoints}
            </span>
          </p>
        </div>
      )}

      {players.length === 0 ? (
        <p className="text-center text-gray-500">No players selected yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {players.map((p, index) => {
            const fantasyPoints = calculateFantasyPoints(p);

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 w-60 flex flex-col items-center"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-xl font-bold mt-2 text-center">{p.name}</h2>
                <p className="text-center text-sm text-gray-600">
                  {p.position}
                </p>

                {/* 🧮 Fantasy Points */}
                <div className="mt-2 text-center">
                  <span className="text-sm text-gray-500">Fantasy Pts</span>
                  <p className="text-2xl font-bold text-blue-600">
                    {fantasyPoints}
                  </p>
                </div>

                {/* ปุ่ม Remove */}
                <button
                  onClick={() => handleRemovePlayer(p.name)}
                  className="mt-3 bg-gray-200 hover:bg-gray-300 text-red-600 font-semibold px-3 py-1 rounded-lg transition w-full"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
