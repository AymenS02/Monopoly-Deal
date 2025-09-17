import { createContext } from "react";
import type { GameState } from "./gameStore";

export type StoreContextType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
};

// Use undefined initially
export const StoreContext = createContext<StoreContextType | undefined>(undefined);
