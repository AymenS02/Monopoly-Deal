// src/game/utils/deck.ts

import type { CardTemplate } from "../data/cards";

// Each card in the actual game deck (instance created from a template)
export type Card = {
  instanceId: string;  // unique per copy
  templateId: number;  // original template id
  name: string;
  type: "money" | "property" | "action";
  value: number;
  color?: string;
  colors?: string[];
  currentColor?: string;
  actionEffect?: string;
  image: string;
  flippedImage?: string;
};

// Fisher-Yates shuffle
export function shuffleDeck<T>(deck: T[]): T[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Create real deck from templates with duplicates
export function createDeckFromTemplates(templates: CardTemplate[]): Card[] {
  const deck: Card[] = [];

  templates.forEach((template) => {
    for (let i = 0; i < template.quantity; i++) {
      deck.push({
        instanceId: `${template.id}-${i}`, // unique per copy
        templateId: template.id,
        name: template.name,
        type: template.type,
        value: template.value,
        color: template.color,
        colors: template.colors,
        currentColor: template.currentColor,
        actionEffect: template.actionEffect,
        image: template.image,
        flippedImage: template.flippedImage,
      });
    }
  });

  return deck;
}
