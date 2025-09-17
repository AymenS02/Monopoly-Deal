import type { GameState } from "../store/gameStore";

// Move to the next player's turn
export function nextPlayer(gameState: GameState): GameState {
  const state = { ...gameState };
  state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
  return state;
}

// Draw a card from deck into player's hand
export function drawCard(gameState: GameState, playerId: number): GameState {
  const state = { ...gameState };
  const player = state.players.find(p => p.id === playerId);
  if (!player || state.deck.length === 0) return state;

  const card = state.deck.shift()!;
  player.hand.push(card);
  return state;
}
