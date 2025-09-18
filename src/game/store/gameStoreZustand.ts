// src/game/store/gameStoreZustand.ts
import { create } from "zustand";
import type { Player, GameState } from "./gameStore";
import type { Card } from "../utils/deck";

type GameStore = {
  // Global game state
  gameState: GameState;
  setGameState: (state: Partial<GameState>) => void;

  // Your hand
  myHand: Card[];
  setMyHand: (hand: Card[]) => void;

  // Player tracking
  playerId: string | undefined;
  setPlayerId: (id: string) => void;
  myPlayer: Player | undefined;
  setMyPlayer: (player: Player | undefined) => void;

  // Selected card for play
  selectedCard: Card | undefined;
  setSelectedCard: (card: Card | undefined) => void;

  // Clear all game state
  clearGameState: () => void;
};

// Initial state values
const initialGameState: GameState = {
  players: [],
  deck: [],
  discardPile: [],
  currentPlayer: 0,
  movesLeft: 3, // initialize movesLeft to 0 or your desired default
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: initialGameState,
  setGameState: (state) =>
    set((prev) => ({
      gameState: { ...prev.gameState, ...state },
    })),

  myHand: [],
  setMyHand: (hand) => set({ myHand: hand }),

  playerId: undefined,
  setPlayerId: (id) => set({ playerId: id }),

  myPlayer: undefined,
  setMyPlayer: (player) => set({ myPlayer: player }),

  selectedCard: undefined,
  setSelectedCard: (card) => set({ selectedCard: card }),

  // Reset everything back to initial state
  clearGameState: () => set({
    gameState: initialGameState,
    myHand: [],
    playerId: undefined,
    myPlayer: undefined,
    selectedCard: undefined,
  }),
}));