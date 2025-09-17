import type { Card } from "../utils/deck";

// Each player in the game
export type Player = {
  id: number;
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
