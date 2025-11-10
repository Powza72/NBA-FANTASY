import React, { useRef } from "react";

export default function TeamCard({ player, team }) {
  const videoRef = useRef(null);

  const nameParts = (player.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

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
    positionMap[player.position] || (player.position || "").toUpperCase();

  const handleAddPlayer = () => {
    const savedPlayers =
      JSON.parse(localStorage.getItem("fantasyPlayers")) || [];
    if (savedPlayers.length >= 6)
      return alert("You can only select up to 6 players!");
    if (savedPlayers.some((p) => p.name === player.name))
      return alert("This player has already been added!");
    const updated = [...savedPlayers, player];
    localStorage.setItem("fantasyPlayers", JSON.stringify(updated));
    alert(`${player.name} added to your Fantasy team!`);
  };

  // Handlers to control video playback (when hovering the whole image area)
  const handleMouseEnter = () => {
    if (videoRef.current) {
      // play returns a promise in some browsers — ignore errors
      videoRef.current.play().catch(() => {});
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      try {
        videoRef.current.currentTime = 0;
      } catch (e) {}
    }
  };

  return (
    <div
      className="
        bg-white rounded-2xl shadow-sm overflow-hidden 
        w-full max-w-[20rem] sm:max-w-[20rem]
        ml-9 sm:ml-0
        border border-gray-200 
        transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* Header - Jersey number */}
      <div className="bg-gray-100 text-gray-800 flex items-center justify-center h-12 sm:h-22">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-wide">
          {player.jerseyNumber}
        </span>
      </div>

      {/* Player image + hover video */}
      <div
        className="relative bg-gray-50 overflow-hidden group"
        onMouseEnter={player.video ? handleMouseEnter : undefined}
        onMouseLeave={player.video ? handleMouseLeave : undefined}
      >
        {/* รูปนิ่ง */}
        <img
          src={
            player.img ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              player.name
            )}&background=888&color=fff&size=256`
          }
          alt={player.name}
          className="w-full h-52 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* วิดีโอ */}
        {player.video && (
          <video
            ref={videoRef}
            src={player.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:scale-100"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
            onPlay={(e) => (e.currentTarget.style.opacity = "1")}
            onPause={(e) => (e.currentTarget.style.opacity = "0")}
          />
        )}
      </div>

      {/* Info section */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="mb-2">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase">
            {firstName}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-wide">
            {lastName}
          </h2>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mt-1">
            {fullPosition}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 text-center mt-3 text-gray-700 ">
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-400">AGE</p>
            <p className="text-lg font-bold">{player.age || "--"}</p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-400">PPG</p>
            <p className="text-lg font-bold">{player.ppg || "--"}</p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-400">PRICE</p>
            <p className="text-lg  font-bold">${player.price || "--"} M</p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-gray-400">INJURY</p>
            <p className="text-lg text-red-700  font-bold">
              {player.injury || "--"}
            </p>
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={handleAddPlayer}
          className="
            mt-4 sm:mt-5 w-full 
            bg-gray-900 hover:bg-black text-white 
            font-semibold py-2 rounded-xl transition
          "
        >
          Add to Fantasy
        </button>
      </div>
    </div>
  );
}
