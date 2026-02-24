import { create } from "zustand";

export const useGame = create((set) => ({
  phase: "playing", // <--- ODMAH KREĆE AKCIJA (vuku konopac)
  redScore: 0,
  blueScore: 0,
  winner: null,

  startGame: () => set({ phase: "playing", redScore: 0, blueScore: 0, winner: null }),

  addScore: (team, points) => set((state) => {
    if (state.phase !== "playing") return state;

    const newRed = team === "red" ? state.redScore + points : state.redScore;
    const newBlue = team === "blue" ? state.blueScore + points : state.blueScore;
    
    // LIMIT JE SADA 20 (Brza partija)
    const WIN_LIMIT = 20;

    if (newRed - newBlue >= WIN_LIMIT) return { redScore: newRed, blueScore: newBlue, phase: "ended", winner: "red" };
    if (newBlue - newRed >= WIN_LIMIT) return { redScore: newRed, blueScore: newBlue, phase: "ended", winner: "blue" };

    return { redScore: newRed, blueScore: newBlue };
  }),

  // Kad resetuješ, opet kreće odmah akcija
  resetGame: () => set({ phase: "playing", redScore: 0, blueScore: 0, winner: null }),
}));