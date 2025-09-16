import { create } from "zustand";
import { cards } from "../data/cards";
import { shuffleDeck } from "../game/utils/deck";

// Card interface - adjust based on your actual card structure
export interface Card {
  id: number;
  name: string;
  type: 'property' | 'money' | 'action' | 'rent' | 'wild';
  color?: string;
  colors?: string[]; // for wild cards and rent cards
  value: number;
  rent?: number[];
  description?: string;
}

// Property set interface for tracking complete sets
export interface PropertySet {
  color: string;
  cards: Card[];
  isComplete: boolean;
  requiredCount: number;
}

export interface Player {
  id: number;
  name: string;
  hand: Card[];
  bank: Card[];
  properties: Card[];
  propertySets: PropertySet[];
  completeSets: number;
}

// Game phase union type
export type GamePhase = 'setup' | 'playing' | 'ended';

// Action types for turn tracking
export type ActionType = 'draw' | 'play_property' | 'play_action' | 'charge_rent' | 'bank_card';

export interface GameAction {
  type: ActionType;
  playerId: number;
  card?: Card;
  target?: number; // target player id
  timestamp: number;
}

interface GameState {
  // Game data
  deck: Card[];
  discardPile: Card[];
  players: Player[];
  currentPlayer: number;
  turnActions: number;
  maxTurnActions: number;
  phase: GamePhase;
  winner: number | null;
  actionHistory: GameAction[];

  // Core game actions
  startGame: (playerNames: string[]) => void;
  drawCard: (playerId: number, count?: number) => void;
  nextTurn: () => void;
  endGame: (winnerId: number) => void;

  // Card actions
  playProperty: (playerId: number, card: Card, setColor?: string) => boolean;
  playActionCard: (playerId: number, card: Card, targetId?: number) => boolean;
  chargeRent: (playerId: number, card: Card, propertyColor: string) => boolean;
  bankCard: (playerId: number, card: Card) => boolean;
  discardCard: (playerId: number, card: Card) => void;

  // Game state helpers
  getCurrentPlayer: () => Player | null;
  getPlayerById: (id: number) => Player | null;
  canPlayCard: (playerId: number, card: Card) => boolean;
  canEndTurn: (playerId: number) => boolean;
  checkWinCondition: (playerId: number) => boolean;
  getPlayerBankValue: (playerId: number) => number;

  // Property management
  organizeProperties: (playerId: number) => void;
  moveProperty: (playerId: number, card: Card, fromSetColor: string, toSetColor: string) => boolean;
  
  // Action card effects
  executeStealProperty: (fromPlayerId: number, toPlayerId: number, card: Card) => boolean;
  executeStealSet: (fromPlayerId: number, toPlayerId: number, setColor: string) => boolean;
  executeForcePayment: (fromPlayerId: number, toPlayerId: number, amount: number) => void;
}

// Property set requirements (standard Monopoly Deal rules)
const PROPERTY_SET_REQUIREMENTS: Record<string, number> = {
  'brown': 2,
  'light_blue': 3,
  'pink': 3,
  'orange': 3,
  'red': 3,
  'yellow': 3,
  'green': 3,
  'blue': 2,
  'railroad': 4,
  'utility': 2
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  deck: [],
  discardPile: [],
  players: [],
  currentPlayer: 0,
  turnActions: 0,
  maxTurnActions: 3,
  phase: 'setup' as GamePhase,
  winner: null,
  actionHistory: [],

  // Core game actions
  startGame: (playerNames) => {
    const shuffled = shuffleDeck([...cards]);

    const players: Player[] = playerNames.map((name, i) => ({
      id: i,
      name,
      hand: [],
      bank: [],
      properties: [],
      propertySets: [],
      completeSets: 0,
    }));

    // Deal 5 cards to each player
    players.forEach((player) => {
      player.hand = shuffled.splice(0, 5) as Card[];
    });

    set({
      deck: shuffled as Card[],
      discardPile: [],
      players,
      currentPlayer: 0,
      turnActions: 0,
      phase: 'playing' as GamePhase,
      winner: null,
      actionHistory: [],
    });
  },

  drawCard: (playerId, count = 1) => {
    const { deck, players } = get();
    
    if (deck.length === 0) return; // No cards to draw
    
    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);

    if (player) {
      const actualCount = Math.min(count, deck.length);
      const drawn = deck.splice(0, actualCount);
      player.hand.push(...drawn);
      
      set({ 
        deck: [...deck], 
        players: updatedPlayers,
        actionHistory: [...get().actionHistory, {
          type: 'draw' as ActionType,
          playerId,
          timestamp: Date.now()
        }]
      });
    }
  },

  nextTurn: () => {
    const { players, currentPlayer, actionHistory } = get();
    const nextPlayerId = (currentPlayer + 1) % players.length;

    set({
      currentPlayer: nextPlayerId,
      turnActions: 0,
    });

    // Auto-draw 2 cards for the next player at start of turn
    get().drawCard(nextPlayerId, 2);
  },

  endGame: (winnerId) => {
    set({
      phase: 'ended' as GamePhase,
      winner: winnerId
    });
  },

  // Card playing actions
  playProperty: (playerId, card, setColor) => {
    const { players, turnActions, maxTurnActions } = get();
    
    if (turnActions >= maxTurnActions) return false;
    if (!['property', 'wild'].includes(card.type)) return false;

    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);
    
    if (!player) return false;

    // Remove from hand
    player.hand = player.hand.filter((c) => c.id !== card.id);
    
    // Add to properties
    player.properties.push(card);
    
    // Organize properties into sets
    get().organizeProperties(playerId);
    
    // Check win condition
    if (get().checkWinCondition(playerId)) {
      get().endGame(playerId);
    }

    set({
      players: updatedPlayers,
      turnActions: turnActions + 1,
      actionHistory: [...get().actionHistory, {
        type: 'play_property' as ActionType,
        playerId,
        card,
        timestamp: Date.now()
      }]
    });

    return true;
  },

  playActionCard: (playerId, card, targetId) => {
    const { players, turnActions, maxTurnActions } = get();
    
    if (turnActions >= maxTurnActions) return false;
    if (card.type !== 'action') return false;

    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);
    
    if (!player) return false;

    // Remove from hand
    player.hand = player.hand.filter((c) => c.id !== card.id);
    
    // Add to discard pile
    const { discardPile } = get();
    discardPile.push(card);

    // Execute action effect based on card name
    // This would be expanded based on your specific action cards
    switch (card.name.toLowerCase()) {
      case 'deal breaker':
        if (targetId !== undefined) {
          // Implementation would go here
        }
        break;
      case 'sly deal':
        if (targetId !== undefined) {
          // Implementation would go here  
        }
        break;
      // Add other action cards...
    }

    set({
      players: updatedPlayers,
      discardPile: [...discardPile],
      turnActions: turnActions + 1,
      actionHistory: [...get().actionHistory, {
        type: 'play_action' as ActionType,
        playerId,
        card,
        target: targetId,
        timestamp: Date.now()
      }]
    });

    return true;
  },

  chargeRent: (playerId, card, propertyColor) => {
    const { players, turnActions, maxTurnActions } = get();
    
    if (turnActions >= maxTurnActions) return false;
    if (card.type !== 'rent') return false;

    const player = players.find((p) => p.id === playerId);
    if (!player) return false;

    // Check if player has properties of the specified color
    const hasColorProperty = player.properties.some((prop) => 
      prop.color === propertyColor || 
      (prop.colors && prop.colors.includes(propertyColor))
    );

    if (!hasColorProperty) return false;

    // Remove rent card from hand and add to discard
    const updatedPlayers = [...players];
    const updatedPlayer = updatedPlayers.find((p) => p.id === playerId);
    if (updatedPlayer) {
      updatedPlayer.hand = updatedPlayer.hand.filter((c) => c.id !== card.id);
    }

    const { discardPile } = get();
    discardPile.push(card);

    set({
      players: updatedPlayers,
      discardPile: [...discardPile],
      turnActions: turnActions + 1,
      actionHistory: [...get().actionHistory, {
        type: ActionType.CHARGE_RENT,
        playerId,
        card,
        timestamp: Date.now()
      }]
    });

    return true;
  },

  bankCard: (playerId, card) => {
    const { players } = get();
    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);
    
    if (!player) return false;

    // Remove from hand
    player.hand = player.hand.filter((c) => c.id !== card.id);
    
    // Add to bank
    player.bank.push(card);

    set({
      players: updatedPlayers,
      actionHistory: [...get().actionHistory, {
        type: ActionType.BANK_CARD,
        playerId,
        card,
        timestamp: Date.now()
      }]
    });

    return true;
  },

  discardCard: (playerId, card) => {
    const { players, discardPile } = get();
    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);
    
    if (player) {
      player.hand = player.hand.filter((c) => c.id !== card.id);
      discardPile.push(card);
      
      set({
        players: updatedPlayers,
        discardPile: [...discardPile]
      });
    }
  },

  // Helper functions
  getCurrentPlayer: () => {
    const { players, currentPlayer } = get();
    return players[currentPlayer] || null;
  },

  getPlayerById: (id) => {
    const { players } = get();
    return players.find((p) => p.id === id) || null;
  },

  canPlayCard: (playerId, card) => {
    const { currentPlayer, turnActions, maxTurnActions } = get();
    
    if (playerId !== currentPlayer) return false;
    if (turnActions >= maxTurnActions && card.type !== 'money') return false;
    
    return true;
  },

  canEndTurn: (playerId) => {
    const player = get().getPlayerById(playerId);
    if (!player) return false;
    
    // Must have 7 or fewer cards in hand
    return player.hand.length <= 7;
  },

  checkWinCondition: (playerId) => {
    const player = get().getPlayerById(playerId);
    if (!player) return false;
    
    // Win condition: 3 complete property sets
    return player.completeSets >= 3;
  },

  getPlayerBankValue: (playerId) => {
    const player = get().getPlayerById(playerId);
    if (!player) return 0;
    
    return player.bank.reduce((total, card) => total + card.value, 0);
  },

  organizeProperties: (playerId) => {
    const { players } = get();
    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);
    
    if (!player) return;

    // Group properties by color
    const colorGroups: Record<string, Card[]> = {};
    
    player.properties.forEach((card) => {
      if (card.color) {
        if (!colorGroups[card.color]) {
          colorGroups[card.color] = [];
        }
        colorGroups[card.color].push(card);
      }
    });

    // Create property sets
    const propertySets: PropertySet[] = Object.entries(colorGroups).map(([color, cards]) => {
      const requiredCount = PROPERTY_SET_REQUIREMENTS[color] || 3;
      return {
        color,
        cards,
        isComplete: cards.length >= requiredCount,
        requiredCount
      };
    });

    // Count complete sets
    const completeSets = propertySets.filter((set) => set.isComplete).length;

    player.propertySets = propertySets;
    player.completeSets = completeSets;

    set({ players: updatedPlayers });
  },

  moveProperty: (playerId, card, fromSetColor, toSetColor) => {
    // Implementation for moving wild properties between sets
    return true; // Placeholder
  },

  // Action card implementations
  executeStealProperty: (fromPlayerId, toPlayerId, card) => {
    // Implementation for stealing individual properties
    return true; // Placeholder
  },

  executeStealSet: (fromPlayerId, toPlayerId, setColor) => {
    // Implementation for stealing complete property sets
    return true; // Placeholder
  },

  executeForcePayment: (fromPlayerId, toPlayerId, amount) => {
    // Implementation for forcing payment (rent, debt, etc.)
  },
}));

{/*
  
  import { create } from "zustand";
import { cards } from "../data/cards";
import { shuffleDeck } from "../game/utils/deck";

export interface Player {
  id: number;
  name: string;
  hand: [];
  bank: [];
  properties: [];
}

interface GameState {
  deck: [];
  discardPile: [];
  players: Player[];
  currentPlayer: number;
  turnActions: number;

  startGame: (playerNames: string[]) => void;
  drawCard: (playerId: number, count?: number) => void;
  nextTurn: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  deck: [],
  discardPile: [],
  players: [],
  currentPlayer: 0,
  turnActions: 0,

  startGame: (playerNames) => {
    const shuffled = shuffleDeck([...cards]);

    const players = playerNames.map((name, i) => ({
      id: i,
      name,
      hand: [],
      bank: [],
      properties: [],
    }));

    // deal 5 cards each
    players.forEach((p) => {
      p.hand = shuffled.splice(0, 5);
    });

    set({
      deck: shuffled,
      discardPile: [],
      players,
      currentPlayer: 0,
      turnActions: 0,
    });
  },

  drawCard: (playerId, count = 1) => {
    const { deck, players } = get();
    const updatedPlayers = [...players];
    const player = updatedPlayers.find((p) => p.id === playerId);

    if (player && deck.length > 0) {
      const drawn = deck.splice(0, count);
      player.hand.push(...drawn);
      set({ deck, players: updatedPlayers });
    }
  },

  nextTurn: () => {
    const { players, currentPlayer } = get();
    const next = (currentPlayer + 1) % players.length;

    set({
      currentPlayer: next,
      turnActions: 0,
    });

    // draw 2 cards for next player automatically
    get().drawCard(next, 2);
  },
}));
*/}