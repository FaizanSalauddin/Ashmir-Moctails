export const MENU_CATEGORIES = ["All", "Mocktails", "Shakes", "Smoothies", "Blossom"];

let _id = 0;
const item = (name, category, description) => ({
  id: `product-${++_id}`,
  name,
  category,
  description,
  image: `/placeholders/menu-${category.toLowerCase()}.svg`,
});

export const MENU_ITEMS = [
  // Mocktails
  ...[
    "Virgin Mojito",
    "Green Mint Mojito",
    "Blue Heaven",
    "Mango Delight",
    "Fizzy Orange",
    "Pineapple Paradise",
    "Strawberry Kiss",
    "Dark Berry",
    "Litchi Breeze",
    "Pink Lady",
    "Apple Bite",
    "Fresh Lime",
    "Panna Twist",
    "Love in Heaven",
    "Kiwi Cooler",
    "Tropical Twist",
    "Soda Shikanji",
    "Masala Thump",
  ].map((n) => item(n, "Mocktails", "A signature mocktail crafted fresh at your event.")),

  // Shakes
  ...[
    "Mango Shake",
    "Strawberry Shake",
    "Chocolate Shake",
    "Oreo Shake",
    "KitKat Shake",
  ].map((n) => item(n, "Shakes", "A rich, thick shake blended fresh and served chilled.")),

  // Smoothies
  ...[
    "Black Current Smoothies",
    "Strawberry Smoothies",
    "Banana Smoothies",
    "Mango Smoothies",
  ].map((n) => item(n, "Smoothies", "A fresh fruit smoothie, blended live for a light refreshing option.")),

  // Blossom
  ...[
    "Mango Blossom",
    "Pineapples Blossom",
    "Strawberry Blossom",
    "Green Apple Blossom",
    "Cocktail Blossom",
  ].map((n) => item(n, "Blossom", "A distinctive blossom-style beverage, a house speciality.")),
];
