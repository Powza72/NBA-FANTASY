import React, { useEffect, useState } from "react";

export default function Fantasy() {
  const [players, setPlayers] = useState([]);
  const [money, setMoney] = useState(200); // 💰 เงินเริ่มต้น 100M

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fantasyPlayers")) || [];
    setPlayers(saved);

    // 🔹 คำนวณเงินที่เหลือตามราคาผู้เล่นใน localStorage
    const totalSpent = saved.reduce((sum, p) => sum + (p.price || 0), 0);
    setMoney(200 - totalSpent);
  }, []);

  // 🔹 ซื้อผู้เล่น
  const handleBuyPlayer = (player) => {
    if (money >= player.price) {
      const updated = [...players, player];
      setPlayers(updated);
      localStorage.setItem("fantasyPlayers", JSON.stringify(updated));

      setMoney((prev) => prev - player.price);
    } else {
      alert("Not enough money!");
    }
  };

  // 🔹 คืนเงินเมื่อลบนักเตะ
  const handleRemovePlayer = (name) => {
    const removedPlayer = players.find((p) => p.name === name);
    const updated = players.filter((p) => p.name !== name);
    setPlayers(updated);
    localStorage.setItem("fantasyPlayers", JSON.stringify(updated));

    if (removedPlayer) {
      setMoney((prev) => prev + removedPlayer.price);
    }
  };

  // 🔹 รีเซ็ตทีมและเงิน
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your fantasy team?")) {
      setPlayers([]);
      setMoney(200); // คืนค่าเงินเต็ม 100M
      localStorage.removeItem("fantasyPlayers");
    }
  };

  // 🔹 คำนวณคะแนน fantasy ของผู้เล่น
  const calculateFantasyPoints = (p) => {
    if (!p.stats) return 0;
    const {
      points = 0,
      rebounds = 0,
      assists = 0,
      steals = 0,
      blocks = 0,
      turnovers = 0,
    } = p.stats;

    return (
      points * 1 +
      rebounds * 1.2 +
      assists * 1.5 +
      steals * 3 +
      blocks * 3 +
      turnovers * -1
    ).toFixed(1);
  };

  const totalPoints = players
    .reduce((sum, p) => sum + parseFloat(calculateFantasyPoints(p) || 0), 0)
    .toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-amber-400 tracking-wide drop-shadow-md">
          My Team
        </h1>
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-[0_0_8px_rgba(255,191,0,0.6)] bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
          You now have {money.toFixed(1)} M
        </h1>

        {players.length > 0 && (
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Reset Team
          </button>
        )}
      </div>

      {/* รวมคะแนนทีม */}
      {players.length > 0 && (
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-200">
            Total Fantasy Points:
          </p>
          <p className="text-4xl font-extrabold text-blue-400 drop-shadow-lg">
            {totalPoints}
          </p>
        </div>
      )}

      {players.length === 0 ? (
        <p className="text-center text-gray-400 italic text-lg">
          No players selected yet. Pick your dream team!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {players.map((p, index) => {
            const fantasyPoints = calculateFantasyPoints(p);

            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-5 w-64 flex flex-col items-center border border-white/10 transition transform hover:scale-105 hover:bg-white/20"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-44 object-cover rounded-xl border border-white/10 shadow-md"
                />
                <h2 className="text-xl font-bold mt-3 text-center text-amber-300">
                  {p.name}
                </h2>
                <p className="text-sm text-gray-300">{p.position}</p>

                {/* 🧮 Fantasy Points */}
                <div className="mt-3 text-center bg-slate-800/70 rounded-xl py-2 px-4 w-full">
                  <span className="block text-sm text-gray-400">
                    Fantasy Points
                  </span>
                  <p className="text-2xl font-extrabold text-blue-400">
                    {fantasyPoints}
                  </p>
                </div>

                {/* ปุ่ม Remove */}
                <button
                  onClick={() => handleRemovePlayer(p.name)}
                  className="mt-4 bg-red-500/80 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition w-full transform hover:scale-105"
                >
                  Remove ({p.price}M)
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
