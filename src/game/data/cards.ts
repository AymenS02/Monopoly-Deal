// src/game/data/cards.ts

// 1. Define Card Types
export type CardType = "money" | "property" | "action";

export type CardTemplate = {
  id: number;
  name: string;
  type: CardType;           // "money" | "property" | "action"
  value: number;
  color?: string;           // single color
  colors?: string[];        // dual-color / wild properties
  currentColor?: string;    // color assigned by player when played
  actionEffect?: string;    
  image: string;            // default/front image
  flippedImage?: string;    // optional back image for wild/dual-color cards
  quantity: number;         // duplicates
};

// 2. Starter Deck (not full yet)
export const cards: CardTemplate[] = [

    // =============================
    // Money CARDS
    // =============================

    {
        id: 1,
        name: "Money $1",
        type: "money",
        value: 1,
        image: "/cash/m1.jpg",
        quantity: 6,
    },
    {
        id: 2,
        name: "Money $2",
        type: "money",
        value: 2,
        image: "/cash/m2.jpg",
        quantity: 5,
    },
    {
        id: 3,
        name: "Money $3",
        type: "money",
        value: 3,
        image: "/cash/m3.jpg",
        quantity: 3,
    },
    {
        id: 4,
        name: "Money $4",
        type: "money",
        value: 4,
        image: "/cash/m4.jpg",
        quantity: 3,
    },
    {
        id: 5,
        name: "Money $5",
        type: "money",
        value: 5,
        image: "/cash/m5.jpg",
        quantity: 2,
    },
    {
        id: 6,
        name: "Money $10",
        type: "money",
        value: 10,
        image: "/cash/m10.jpg",
        quantity: 1,
    },

    // =============================
    // PROPERTY CARDS
    // =============================

    // Dark Blue
    { id: 100, name: "Boardwalk", type: "property", value: 4, color: "dark_blue", image: "/blue/b1.jpg", quantity: 1 },
    { id: 101, name: "Park Place", type: "property", value: 4, color: "dark_blue", image: "/blue/b2.jpg", quantity: 1 },

    // Green
    { id: 110, name: "Pacific Avenue", type: "property", value: 4, color: "green", image: "/green/g1.jpg", quantity: 1 },
    { id: 111, name: "Pennsylvania Avenue", type: "property", value: 4, color: "green", image: "/green/g2.jpg", quantity: 1 },
    { id: 112, name: "North Carolina Avenue", type: "property", value: 4, color: "green", image: "/green/g3.jpg", quantity: 1 },

    // Red
    { id: 120, name: "Indiana Avenue", type: "property", value: 3, color: "red", image: "/red/r1.jpg", quantity: 1 },
    { id: 121, name: "Illinois Avenue", type: "property", value: 3, color: "red", image: "/red/r2.jpg", quantity: 1 },
    { id: 122, name: "Kentucky Avenue", type: "property", value: 3, color: "red", image: "/red/r3.jpg", quantity: 1 },

    // Yellow
    { id: 130, name: "Atlantic Avenue", type: "property", value: 3, color: "yellow", image: "/yellow/y1.jpg", quantity: 1 },
    { id: 131, name: "Marvin Gardens", type: "property", value: 3, color: "yellow", image: "/yellow/y2.jpg", quantity: 1 },
    { id: 132, name: "Ventnor Avenue", type: "property", value: 3, color: "yellow", image: "/yellow/y3.jpg", quantity: 1 },

    // Orange
    { id: 140, name: "New York Avenue", type: "property", value: 2, color: "orange", image: "/orange/o1.jpg", quantity: 1 },
    { id: 141, name: "Tennessee Avenue", type: "property", value: 2, color: "orange", image: "/orange/o2.jpg", quantity: 1 },
    { id: 142, name: "St. James Place", type: "property", value: 2, color: "orange", image: "/orange/o3.jpg", quantity: 1 },

    // Pink
    { id: 150, name: "States Avenue", type: "property", value: 2, color: "pink", image: "/pink/p1.jpg", quantity: 1 },
    { id: 151, name: "Virginia Avenue", type: "property", value: 2, color: "pink", image: "/pink/p2.jpg", quantity: 1 },
    { id: 152, name: "St. Charles Place", type: "property", value: 2, color: "pink", image: "/pink/p3.jpg", quantity: 1 },

    // Light Blue
    { id: 160, name: "Connecticut Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s1.jpg", quantity: 1 },
    { id: 161, name: "Oriental Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s2.jpg", quantity: 1 },
    { id: 162, name: "Vermont Avenue", type: "property", value: 1, color: "light_blue", image: "/sky/s3.jpg", quantity: 1 },

    // Brown
    { id: 170, name: "Baltic Avenue", type: "property", value: 1, color: "brown", image: "/brown/b1.jpg", quantity: 1 },
    { id: 171, name: "Mediterranean Avenue", type: "property", value: 1, color: "brown", image: "/brown/b2.jpg", quantity: 1 },

    // Utilities
    { id: 180, name: "Water Works", type: "property", value: 2, color: "utility", image: "/sage/s1.jpg", quantity: 1 },
    { id: 181, name: "Electric Company", type: "property", value: 2, color: "utility", image: "/sage/s2.jpg", quantity: 1 },

    // Railroads
    { id: 190, name: "B&O Railroad", type: "property", value: 2, color: "railroad", image: "/black/b1.jpg", quantity: 1 },
    { id: 191, name: "Pennsylvania Railroad", type: "property", value: 2, color: "railroad", image: "/black/b2.jpg", quantity: 1 },
    { id: 192, name: "Reading Railroad", type: "property", value: 2, color: "railroad", image: "/black/b3.jpg", quantity: 1 },
    { id: 193, name: "Short Line", type: "property", value: 2, color: "railroad", image: "/black/b4.jpg", quantity: 1 },

    // =============================
    // ACTION CARDS
    // =============================

    { id: 200, name: "Deal Breaker", type: "action", value: 5, actionEffect: "steal_full_set", image: "/action/deal_breaker.jpg", quantity: 2 },
    { id: 201, name: "Just Say No", type: "action", value: 4, actionEffect: "block_action", image: "/action/just_say_no.jpg", quantity: 3 },
    { id: 202, name: "Sly Deal", type: "action", value: 3, actionEffect: "steal_single_property", image: "/action/sly_deal.jpg", quantity: 3 },
    { id: 203, name: "Forced Deal", type: "action", value: 3, actionEffect: "swap_property", image: "/action/forced_deal.jpg", quantity: 4 },
    { id: 204, name: "Debt Collector", type: "action", value: 3, actionEffect: "collect_5m", image: "/action/debt_collector.jpg", quantity: 3 },
    { id: 205, name: "Rent Wildcard", type: "action", value: 1, actionEffect: "rent_any_color", image: "/action/rent_wild.jpg", quantity: 3 },
    { id: 206, name: "Rent Red/Yellow", type: "action", value: 1, actionEffect: "rent_red_yellow", image: "/action/rent_red_yellow.jpg", quantity: 2 },
    { id: 207, name: "Rent Green/Blue", type: "action", value: 1, actionEffect: "rent_green_blue", image: "/action/rent_green_blue.jpg", quantity: 2 },
    { id: 208, name: "Rent Orange/Pink", type: "action", value: 1, actionEffect: "rent_orange_pink", image: "/action/rent_orange_pink.jpg", quantity: 2 },
    { id: 209, name: "Rent Brown/Light Blue", type: "action", value: 1, actionEffect: "rent_brown_lightblue", image: "/action/rent_brown_lightblue.jpg", quantity: 2 },
    { id: 210, name: "Rent Railroad/Utility", type: "action", value: 1, actionEffect: "rent_black_sage", image: "/action/rent_black_sage.jpg", quantity: 2 },
    { id: 211, name: "Double The Rent", type: "action", value: 1, actionEffect: "double_rent", image: "/action/double_rent.jpg", quantity: 2 },
    { id: 212, name: "Pass Go", type: "action", value: 1, actionEffect: "draw_2", image: "/action/pass_go.jpg", quantity: 10 },
    { id: 213, name: "House", type: "action", value: 3, actionEffect: "add_house", image: "/action/house.jpg", quantity: 3 },
    { id: 214, name: "Hotel", type: "action", value: 4, actionEffect: "add_hotel", image: "/action/hotel.jpg", quantity: 3 },
    { id: 215, name: "It's My Birthday", type: "action", value: 2, actionEffect: "collect_2m", image: "/action/birthday.jpg", quantity: 3 },

    // =============================
    // WILD PROPERTY CARDS
    // =============================

    { id: 300, name: "Wild Property Card", type: "action", value: 0, actionEffect: "wild_property", image: "/wild_property.jpg", quantity: 2 },
    { id: 301, name: "Wild Black/Green Property Card", type: "property", value: 4, colors: ["black", "green"], currentColor: undefined, actionEffect: "flip_property", image: "/dual/black_green.jpg", flippedImage: '/dual/green_black.jpg', quantity: 1 },
    { id: 302, name: "Wild Black/Sky Property Card", type: "property", value: 4, colors: ["black", "sky"], currentColor: undefined, actionEffect: "flip_property", image: "/dual/black_sky.jpg", flippedImage: '/dual/black_sky.jpg', quantity: 1 },
    { id: 303, name: "Wild Black/Sage Property Card", type: "property", value: 4, colors: ["black", "sage"], currentColor: undefined, actionEffect: "flip_property", image: "/dual/black_sage.jpg", flippedImage: '/dual/black_sage.jpg', quantity: 1 },
    { id: 304, name: "Wild Orange/Pink Property Card", type: "property", value: 4, colors: ["orange", "pink"], currentColor: undefined, actionEffect: "flip_property", image: "/dual/orange_pink.jpg", flippedImage: '/dual/orange_pink_flipped.jpg', quantity: 2 },
    { id: 305, name: "Wild Red/Yellow Property Card", type: "property", value: 4, colors: ["red", "yellow"], currentColor: undefined, actionEffect: "flip_property", image: "/dual/red_yellow.jpg", flippedImage: '/dual/red_yellow_flipped.jpg', quantity: 2 },



]