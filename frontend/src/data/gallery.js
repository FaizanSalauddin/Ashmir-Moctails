export const GALLERY_CATEGORIES = [
  "All",
  "Weddings",
  "Birthdays",
  "Private Events",
  "Corporate",
  "Setups",
];

const img = (i) => `/placeholders/gallery-${i}.svg`;

export const GALLERY_ITEMS = [
  { id: "g1", category: "Weddings", image: img(1), title: "Wedding Mocktail Counter" },
  { id: "g2", category: "Setups", image: img(2), title: "Themed Bar Setup" },
  { id: "g3", category: "Birthdays", image: img(3), title: "Birthday Smoothie Bar" },
  { id: "g4", category: "Corporate", image: img(4), title: "Corporate Event Counter" },
  { id: "g5", category: "Private Events", image: img(5), title: "Private Party Setup" },
  { id: "g6", category: "Weddings", image: img(6), title: "Wedding Reception Bar" },
  { id: "g7", category: "Setups", image: img(7), title: "Custom Themed Counter" },
  { id: "g8", category: "Birthdays", image: img(8), title: "Birthday Celebration Bar" },
  { id: "g9", category: "Corporate", image: img(9), title: "Corporate Offsite Setup" },
  { id: "g10", category: "Weddings", image: img(10), title: "Wedding Fruit Counter" },
  { id: "g11", category: "Private Events", image: img(11), title: "Private Event Hookah Setup" },
  { id: "g12", category: "Setups", image: img(12), title: "Signature Bar Setup" },
];
