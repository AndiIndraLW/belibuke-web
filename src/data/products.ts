export type CategorySlug = 
  | "hand-bouquet"
  | "wedding-bouquet"
  | "flower-box"
  | "wedding-car-decoration";

export type FloralType = "fresh" | "artificial" | "edible";

export interface CategoryItem {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  badge?: string;
  availableFilters: FloralType[];
}

export interface FloralItem {
  id: string;
  name: string;
  categorySlug: CategorySlug;
  categoryName: string;
  type: FloralType;
  image: string;
  price: number;
  tag?: "NEW" | "BEST SELLER";
}

export const formatPrice = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;

export const categories: CategoryItem[] = [
  {
    id: "cat-1",
    slug: "hand-bouquet",
    name: "Hand Bouquet",
    description: "Elegant, personal hand bouquets crafted with fresh, artificial, or edible arrangements.",
    image: "/assets/bouquet_roses.png",
    badge: "Popular",
    availableFilters: ["fresh", "artificial", "edible"],
  },
  {
    id: "cat-2",
    slug: "wedding-bouquet",
    name: "Wedding Bouquet",
    description: "Bespoke luxury bridal bouquets designed for your dream wedding in fresh or artificial florals.",
    image: "/assets/bouquet_luxury.png",
    badge: "Best Seller",
    availableFilters: ["fresh", "artificial"],
  },
  {
    id: "cat-3",
    slug: "flower-box",
    name: "Flower Box",
    description: "Modern, chic boxed floral arrangements curated in fresh, artificial, or edible styles.",
    image: "/assets/collection_hero.png",
    badge: "New",
    availableFilters: ["fresh", "artificial", "edible"],
  },
  {
    id: "cat-4",
    slug: "wedding-car-decoration",
    name: "Wedding Car Decoration",
    description: "Exquisite floral styling for classic and vintage wedding cars.",
    image: "/assets/wedding_car_classic.png",
    badge: "Exclusive",
    availableFilters: [],
  },
];

export const floralItems: FloralItem[] = [
  // Hand Bouquets - Fresh
  {
    id: "hb-fresh-1",
    name: "Rose Blush Fresh Hand Bouquet",
    categorySlug: "hand-bouquet",
    categoryName: "Hand Bouquet",
    type: "fresh",
    image: "/assets/bouquet_roses.png",
    price: 450000,
    tag: "BEST SELLER",
  },
  {
    id: "hb-fresh-2",
    name: "Pastel Whispers Fresh Bouquet",
    categorySlug: "hand-bouquet",
    categoryName: "Hand Bouquet",
    type: "fresh",
    image: "/assets/bouquet_roses.png",
    price: 380000,
    tag: "NEW",
  },
  // Hand Bouquets - Artificial
  {
    id: "hb-art-1",
    name: "Silk Elegance Artificial Bouquet",
    categorySlug: "hand-bouquet",
    categoryName: "Hand Bouquet",
    type: "artificial",
    image: "/assets/bouquet_luxury.png",
    price: 490000,
    tag: "NEW",
  },
  {
    id: "hb-art-2",
    name: "Forever Bloom Artificial Bouquet",
    categorySlug: "hand-bouquet",
    categoryName: "Hand Bouquet",
    type: "artificial",
    image: "/assets/bouquet_luxury.png",
    price: 420000,
  },
  // Hand Bouquets - Edible
  {
    id: "hb-edible-1",
    name: "Choco Delight Edible Bouquet",
    categorySlug: "hand-bouquet",
    categoryName: "Hand Bouquet",
    type: "edible",
    image: "/assets/collection_hero.png",
    price: 550000,
    tag: "BEST SELLER",
  },

  // Wedding Bouquets - Fresh
  {
    id: "wb-fresh-1",
    name: "Luxe Blooms Fresh Wedding Bouquet",
    categorySlug: "wedding-bouquet",
    categoryName: "Wedding Bouquet",
    type: "fresh",
    image: "/assets/bouquet_luxury.png",
    price: 750000,
    tag: "BEST SELLER",
  },
  {
    id: "wb-fresh-2",
    name: "White Elegance Fresh Bridal Bouquet",
    categorySlug: "wedding-bouquet",
    categoryName: "Wedding Bouquet",
    type: "fresh",
    image: "/assets/bouquet_luxury.png",
    price: 650000,
  },
  // Wedding Bouquets - Artificial
  {
    id: "wb-art-1",
    name: "Eternal Grace Artificial Wedding Bouquet",
    categorySlug: "wedding-bouquet",
    categoryName: "Wedding Bouquet",
    type: "artificial",
    image: "/assets/bouquet_roses.png",
    price: 680000,
    tag: "NEW",
  },

  // Flower Box - Fresh
  {
    id: "fb-fresh-1",
    name: "Fresh Petals Luxury Box",
    categorySlug: "flower-box",
    categoryName: "Flower Box",
    type: "fresh",
    image: "/assets/collection_hero.png",
    price: 520000,
    tag: "NEW",
  },
  // Flower Box - Artificial
  {
    id: "fb-art-1",
    name: "Faux Rose Velvet Box",
    categorySlug: "flower-box",
    categoryName: "Flower Box",
    type: "artificial",
    image: "/assets/bouquet_roses.png",
    price: 480000,
  },
  // Flower Box - Edible
  {
    id: "fb-edible-1",
    name: "Gourmet Strawberry & Choco Box",
    categorySlug: "flower-box",
    categoryName: "Flower Box",
    type: "edible",
    image: "/assets/bouquet_luxury.png",
    price: 620000,
    tag: "BEST SELLER",
  },

  // Wedding Car Decoration (No filter)
  {
    id: "wedding-classic-1",
    name: "Classic Rolls Car Decor",
    categorySlug: "wedding-car-decoration",
    categoryName: "Wedding Car Decoration",
    type: "fresh",
    image: "/assets/wedding_car_classic.png",
    price: 1850000,
    tag: "NEW",
  },
  {
    id: "wedding-vintage-1",
    name: "Vintage Dreams Car Decor",
    categorySlug: "wedding-car-decoration",
    categoryName: "Wedding Car Decoration",
    type: "fresh",
    image: "/assets/wedding_car_vintage.png",
    price: 2200000,
  },
  {
    id: "wedding-vintage-2",
    name: "Royal Cabrio Car Decor",
    categorySlug: "wedding-car-decoration",
    categoryName: "Wedding Car Decoration",
    type: "fresh",
    image: "/assets/wedding_car_vintage.png",
    price: 2500000,
    tag: "BEST SELLER",
  },
  {
    id: "wedding-classic-2",
    name: "Graceful Grace Car Decor",
    categorySlug: "wedding-car-decoration",
    categoryName: "Wedding Car Decoration",
    type: "fresh",
    image: "/assets/wedding_car_classic.png",
    price: 1950000,
  },
];

export function getFloralItemById(id: string): FloralItem | undefined {
  return floralItems.find(item => item.id === id);
}

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return categories.find(cat => cat.slug === slug);
}

export function getProductsByCategorySlug(slug: string, filter?: string): FloralItem[] {
  let items = floralItems.filter(item => item.categorySlug === slug);
  if (filter && filter !== "all") {
    items = items.filter(item => item.type === filter);
  }
  return items;
}
