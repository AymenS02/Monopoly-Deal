import type { Player } from "../store/gameStore";
import type { Card } from "../utils/deck";

// Check if a player can play a card
export function canPlayCard(player: Player, card: Card): boolean {
  // Example rules:
  // - Player can always play money
  if (card.type === "money") return true;

  // - Player can play property if they have less than 3 of that color (simplified)
  if (card.type === "property" && card.color) {
    const ownedCount = player.properties.filter(p => p.color === card.color).length;
    return ownedCount < 3;
  }

  // - Player can play any action card
  if (card.type === "action") return true;

  return false;
}

// Check if player has full set of color (simplified)
export function hasFullSet(player: Player, color: string, requiredCount: number): boolean {
  const count = player.properties.filter(c => c.color === color).length;
  return count >= requiredCount;
}
