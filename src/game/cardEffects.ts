// src/game/functions.ts
import type { Card } from "./utils/deck";

export type CardEffect = (card: Card, playerName: string) => void;

export const cardEffects: Record<string, CardEffect> = {
  // --- Money cards ---
  play_money: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Add $${card.value}M to your bank!`);
  },
  // --- Stealing / Blocking ---
  steal_full_set: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Steal a full property set!`);
  },
  block_action: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Block another action!`);
  },
  steal_single_property: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Steal a single property!`);
  },
  swap_property: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Swap one of your properties with another player's!`);
  },

  // --- Collecting money ---
  collect_5m: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Collect $5M from another player!`);
  },
  collect_2m: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Collect $2M from each player (Birthday)!`);
  },

  // --- Rent cards ---
  rent_any_color: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for any property color!`);
  },
  rent_red_yellow: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for Red/Yellow properties!`);
  },
  rent_green_blue: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for Green/Blue properties!`);
  },
  rent_orange_pink: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for Orange/Pink properties!`);
  },
  rent_brown_lightblue: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for Brown/Light Blue properties!`);
  },
  rent_black_sage: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Charge rent for Railroads/Utilities!`);
  },
  double_rent: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Double the rent of your current rent action!`);
  },

  // --- Drawing cards ---
  draw_2: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Draw 2 cards!`);
  },

  // --- Buildings ---
  add_house: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Add a house to a property set!`);
  },
  add_hotel: (card, playerName) => {
    console.log(`${playerName} played ${card.name} → Add a hotel to a property set!`);
  }
};
