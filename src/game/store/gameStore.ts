// src/game/store/gameStore.ts


import type { Card } from "../utils/deck";

// Each player in the game
export type Player = {
  id: string | undefined; // socket ID
  name: string;
  hand: Card[];
  bank: Card[];
  properties: Card[];
};

// Overall game state
export type GameState = {
  players: Player[];
  deck: Card[];
  discardPile: Card[];
  currentPlayer: number;
};
