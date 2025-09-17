import type { GameState } from "../store/gameStore";

// Example: Play a card from a player’s hand
export function playCard(gameState: GameState, playerId: number, cardId: string): GameState {
  const state = { ...gameState };
  const player = state.players.find(p => p.id === playerId);
  if (!player) return state;

  const cardIndex = player.hand.findIndex(c => c.instanceId === cardId);
  if (cardIndex === -1) return state;

  const [card] = player.hand.splice(cardIndex, 1);
  
  // For money cards, add to bank
  if (card.type === "money") player.bank.push(card);

  // For property cards, add to properties
  if (card.type === "property") player.properties.push(card);

  // For action cards, just move to discard pile (effect handled elsewhere)
  if (card.type === "action") state.discardPile.push(card);

  return state;
}

// Example: Collect rent (simplified)
export function collectRent(gameState: GameState, fromPlayerId: number, toPlayerId: number, amount: number): GameState {
  const state = { ...gameState };
  const fromPlayer = state.players.find(p => p.id === fromPlayerId);
  const toPlayer = state.players.find(p => p.id === toPlayerId);
  if (!fromPlayer || !toPlayer) return state;

  // Take money from fromPlayer's bank
  let remaining = amount;
  fromPlayer.bank = fromPlayer.bank.filter(card => {
    if (remaining <= 0 || card.type !== "money") return true;
    remaining -= card.value;
    return false;
  });

  // Add to toPlayer's bank
  toPlayer.bank.push({ instanceId: `rent-${Date.now()}`, templateId: 0, name: `Rent $${amount}`, type: "money", value: amount, image: "" });

  return state;
}
