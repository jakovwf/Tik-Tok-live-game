import { useGame } from "../hooks/useGame";

export const UI = () => {
  const { phase, redScore, blueScore, addScore, resetGame, winner } = useGame();

  return (
    <div className="ui-container">
      {/* REZULTAT */}
      <div className="score-board">
        <div className="score-blue">Blue: {blueScore}</div>
        <div className="score-red">Red: {redScore}</div>
      </div>

      {/* --- TEST PANEL (SAMO DOK TESTIRAŠ) --- */}
      {phase === "playing" && (
        <div className="test-panel">
          <div className="team-controls blue-controls">
            <h3>💙 BLUE TEAM</h3>
            <button onClick={() => addScore('blue', 1)}>👍 Like (+1)</button>
            <button onClick={() => addScore('blue', 5)}>🎁 Gift (+5)</button>
          </div>
          
          <div className="vs-badge">VS</div>

          <div className="team-controls red-controls">
            <h3>❤️ RED TEAM</h3>
            <button onClick={() => addScore('red', 1)}>👍 Like (+1)</button>
            <button onClick={() => addScore('red', 5)}>🎁 Gift (+5)</button>
          </div>
        </div>
      )}

      {/* KRAJ IGRE */}
      {phase === "ended" && (
        <div className="overlay-screen">
          <h1 className="winner-text" style={{ color: winner === 'red' ? '#ef4444' : '#3b82f6' }}>
            {winner === "red" ? "RED WINS!" : "BLUE WINS!"}
          </h1>
          <button onClick={resetGame} className="btn-restart">
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};