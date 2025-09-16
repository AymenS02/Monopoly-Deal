// src/game/data/cards.ts

// 1. Define Card Types
export type CardType = "money" | "property" | "action";

export type Card = {
    id: number;               // unique ID for tracking
    name: string;             // display name
    type: CardType;           // money | property | action
    value: number;            // monetary value (used for bank)
    color?: string;           // only for property cards (e.g. "red", "blue")
    actionEffect?: string;    // only for action cards (e.g. "rent", "steal")
    image: string;            // path to image
};

// 2. Starter Deck (not full yet)
export const cards: Card[] = [

    // =============================
    // Money CARDS
    // =============================

    {
        id: 1,
        name: "Money $1",
        type: "money",
        value: 1,
        image: "/cash/m1.jpg",
    },
    {
        id: 2,
        name: "Money $2",
        type: "money",
        value: 2,
        image: "/cash/m2.jpg",
    },
    {
        id: 3,
        name: "Money $3",
        type: "money",
        value: 3,
        image: "/cash/m3.jpg",
    },
    {
        id: 4,
        name: "Money $4",
        type: "money",
        value: 4,
        image: "/cash/m4.jpg",
    },
    {
        id: 5,
        name: "Money $5",
        type: "money",
        value: 5,
        image: "/cash/m5.jpg",
    },
    {
        id: 6,
        name: "Money $10",
        type: "money",
        value: 10,
        image: "/cash/m10.jpg",
    },

    // =============================
    // PROPERTY CARDS
    // =============================

    // Dark Blue
    { id: 100, name: "Boardwalk", type: "property", value: 4, color: "dark_blue", image: "/blue/b1.jpg" },
    { id: 101, name: "Park Place", type: "property", value: 4, color: "dark_blue", image: "/blue/b2.jpg" },

    // Green
    { id: 110, name: "Pacific Avenue", type: "property", value: 4, color: "green", image: "/green/g1.jpg" },
    { id: 111, name: "Pennsylvania Avenue", type: "property", value: 4, color: "green", image: "/green/g2.jpg" },
    { id: 112, name: "North Carolina Avenue", type: "property", value: 4, color: "green", image: "/green/g3.jpg" },

    // Red
    { id: 120, name: "Indiana Avenue", type: "property", value: 3, color: "red", image: "/red/r1.jpg" },
    { id: 121, name: "Illinois Avenue", type: "property", value: 3, color: "red", image: "/red/r2.jpg" },
    { id: 122, name: "Kentucky Avenue", type: "property", value: 3, color: "red", image: "/red/r3.jpg" },

    // Yellow
    { id: 130, name: "Atlantic Avenue", type: "property", value: 3, color: "yellow", image: "/yellow/y1.jpg" },
    { id: 131, name: "Marvin Gardens", type: "property", value: 3, color: "yellow", image: "/yellow/y2.jpg" },
    { id: 132, name: "Ventnor Avenue", type: "property", value: 3, color: "yellow", image: "/yellow/y3.jpg" },

    // Orange
    { id: 140, name: "New York Avenue", type: "property", value: 2, color: "orange", image: "/orange/o1.jpg" },
    { id: 141, name: "Tennessee Avenue", type: "property", value: 2, color: "orange", image: "/orange/o2.jpg" },
    { id: 142, name: "St. James Place", type: "property", value: 2, color: "orange", image: "/orange/o3.jpg" },

    // Pink
    { id: 150, name: "States Avenue", type: "property", value: 2, color: "pink", image: "/pink/p1.jpg" },
    { id: 151, name: "Virginia Avenue", type: "property", value: 2, color: "pink", image: "/pink/p2.jpg" },
    { id: 152, name: "St. Charles Place", type: "property", value: 2, color: "pink", image: "/pink/p3.jpg" },

    // Light Blue
    { id: 160, name: "Connecticut Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s1.jpg" },
    { id: 161, name: "Oriental Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s2.jpg" },
    { id: 162, name: "Vermont Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s3.jpg" },

    // Brown
    { id: 170, name: "Baltic Avenue", type: "property", value: 1, color: "brown", image: "/brown/b1.jpg" },
    { id: 171, name: "Mediterranean Avenue", type: "property", value: 1, color: "brown", image: "/brown/b2.jpg" },

    // Utilities
    { id: 180, name: "Water Works", type: "property", value: 2, color: "utility", image: "/sage/s1.jpg" },
    { id: 181, name: "Electric Company", type: "property", value: 2, color: "utility", image: "/sage/s2.jpg" },

    // Railroads
    { id: 190, name: "B&O Railroad", type: "property", value: 2, color: "railroad", image: "/black/b1.jpg" },
    { id: 191, name: "Pennsylvania Railroad", type: "property", value: 2, color: "railroad", image: "/black/b2.jpg" },
    { id: 192, name: "Reading Railroad", type: "property", value: 2, color: "railroad", image: "/black/b3.jpg" },
    { id: 193, name: "Short Line", type: "property", value: 2, color: "railroad", image: "/black/b4.jpg" },

    // =============================
    // ACTION CARDS
    // =============================

    { id: 200, name: "Deal Breaker", type: "action", value: 5, actionEffect: "steal_full_set", image: "/action/deal_breaker.jpg" },
    { id: 201, name: "Just Say No", type: "action", value: 4, actionEffect: "block_action", image: "/action/just_say_no.jpg" },
    { id: 202, name: "Sly Deal", type: "action", value: 3, actionEffect: "steal_single_property", image: "/action/sly_deal.jpg" },
    { id: 203, name: "Forced Deal", type: "action", value: 3, actionEffect: "swap_property", image: "/action/forced_deal.jpg" },
    { id: 204, name: "Debt Collector", type: "action", value: 3, actionEffect: "collect_5m", image: "/action/debt_collector.jpg" },
    { id: 205, name: "Rent Wildcard", type: "action", value: 1, actionEffect: "rent_any_color", image: "/action/rent_wild.jpg" },
    { id: 206, name: "Rent Red/Yellow", type: "action", value: 1, actionEffect: "rent_red_yellow", image: "/action/rent_red_yellow.jpg" },
    { id: 207, name: "Rent Green/Blue", type: "action", value: 1, actionEffect: "rent_green_blue", image: "/action/rent_green_blue.jpg" },
    { id: 208, name: "Rent Orange/Pink", type: "action", value: 1, actionEffect: "rent_orange_pink", image: "/action/rent_orange_pink.jpg" },
    { id: 209, name: "Rent Brown/Light Blue", type: "action", value: 1, actionEffect: "rent_brown_lightblue", image: "/action/rent_brown_lightblue.jpg" },
    { id: 210, name: "Rent Railroad/Utility", type: "action", value: 1, actionEffect: "rent_black_sage", image: "/action/rent_black_sage.jpg" },
    { id: 211, name: "Double The Rent", type: "action", value: 1, actionEffect: "double_rent", image: "/action/double_rent.jpg" },
    { id: 212, name: "Pass Go", type: "action", value: 1, actionEffect: "draw_2", image: "/action/pass_go.jpg" },
    { id: 213, name: "House", type: "action", value: 3, actionEffect: "add_house", image: "/action/house.jpg" },
    { id: 214, name: "Hotel", type: "action", value: 4, actionEffect: "add_hotel", image: "/action/hotel.jpg" },

];
