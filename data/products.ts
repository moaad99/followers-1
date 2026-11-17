/**
 * Product catalogue: Instagram and TikTok follower packages.
 *
 * To change a price: edit `price` on the package below.
 * To add a package: copy one object in PRODUCTS, give it a unique `slug`,
 * set `quantity` and `price`, and add images in /public/images/products/.
 * The first image in `images` is used as the card cover.
 * To remove a package: delete its object.
 *
 * Prices, delivery times and requirements below are examples.
 * Check them against your own service before going live.
 */

export const CATEGORIES = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Availability = "in-stock" | "limited" | "pre-order" | "sold-out";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  /** One-line summary shown on product cards. */
  shortDescription: string;
  /** Paragraphs shown on the product page. */
  description: string[];
  price: number;
  /** Optional original price, shown struck through. Only use a real former price. */
  compareAtPrice?: number;
  /** The platform. Used for filtering. */
  category: CategoryId;
  /** Number of followers in the package. */
  quantity: number;
  availability: Availability;
  featured?: boolean;
  images: string[];
  features: string[];
  specs: ProductSpec[];
  delivery: {
    start: string;
    speed: string;
    requirement: string;
  };
  faqs?: ProductFaq[];
}

const img = (slug: string) => [
  `/images/products/${slug}-cover.svg`,
  `/images/products/${slug}-preview.svg`,
  `/images/products/${slug}-details.svg`,
];

const INSTAGRAM_FAQS: ProductFaq[] = [
  {
    question: "Does my Instagram account need to be public?",
    answer:
      "Yes. Keep your profile public until delivery is complete. Followers can't be added to a private account.",
  },
  {
    question: "Can I change my username during delivery?",
    answer:
      "Please don't. Changing your username before delivery is complete can stop the order. Tell us on WhatsApp if you need to change it.",
  },
];

const TIKTOK_FAQS: ProductFaq[] = [
  {
    question: "Does my TikTok account need to be public?",
    answer:
      "Yes. Keep your account public until delivery is complete. Followers can't be added to a private account.",
  },
  {
    question: "Can I change my username during delivery?",
    answer:
      "Please don't. Changing your username before delivery is complete can stop the order. Tell us on WhatsApp if you need to change it.",
  },
];

export const PRODUCTS: Product[] = [
  // Instagram
  {
    slug: "instagram-followers-100",
    name: "100 Instagram Followers",
    shortDescription: "A small boost for a new or growing Instagram profile.",
    description: [
      "Add 100 followers to your Instagram profile. It's the simplest way to try the service before ordering a bigger package.",
      "You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 3,
    category: "instagram",
    quantity: 100,
    availability: "in-stock",
    images: img("instagram-followers-100"),
    features: [
      "100 followers added to your Instagram profile",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Order and follow-up on WhatsApp",
    ],
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Quantity", value: "100 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "Same day" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed the same day",
      requirement: "Public account during delivery",
    },
    faqs: INSTAGRAM_FAQS,
  },
  {
    slug: "instagram-followers-1k",
    name: "1,000 Instagram Followers",
    shortDescription: "A clear step up for creators and small businesses.",
    description: [
      "Add 1,000 followers to your Instagram profile. A good fit for a new brand page, a small shop or a creator starting to post regularly.",
      "Followers are added gradually rather than all at once. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 15,
    category: "instagram",
    quantity: 1000,
    availability: "in-stock",
    featured: true,
    images: img("instagram-followers-1k"),
    features: [
      "1,000 followers added to your Instagram profile",
      "Delivered gradually rather than all at once",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Order and follow-up on WhatsApp",
    ],
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Quantity", value: "1,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "Within 1 day" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed within 1 day",
      requirement: "Public account during delivery",
    },
    faqs: INSTAGRAM_FAQS,
  },
  {
    slug: "instagram-followers-5k",
    name: "5,000 Instagram Followers",
    shortDescription: "For profiles ready to look established.",
    description: [
      "Add 5,000 followers to your Instagram profile. Suited to businesses, artists and creators who already post often.",
      "Followers are added gradually over a few days. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 59,
    category: "instagram",
    quantity: 5000,
    availability: "in-stock",
    images: img("instagram-followers-5k"),
    features: [
      "5,000 followers added to your Instagram profile",
      "Delivered gradually over 2 to 3 days",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Progress updates on WhatsApp if you ask",
    ],
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Quantity", value: "5,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "2 to 3 days" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed in 2 to 3 days",
      requirement: "Public account during delivery",
    },
    faqs: INSTAGRAM_FAQS,
  },
  {
    slug: "instagram-followers-10k",
    name: "10,000 Instagram Followers",
    shortDescription: "The largest Instagram package, with the lowest price per follower.",
    description: [
      "Add 10,000 followers to your Instagram profile. It's the best value per follower in the store.",
      "Followers are added gradually over several days. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 99,
    category: "instagram",
    quantity: 10000,
    availability: "in-stock",
    images: img("instagram-followers-10k"),
    features: [
      "10,000 followers added to your Instagram profile",
      "Delivered gradually over 3 to 5 days",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Progress updates on WhatsApp if you ask",
    ],
    specs: [
      { label: "Platform", value: "Instagram" },
      { label: "Quantity", value: "10,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "3 to 5 days" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed in 3 to 5 days",
      requirement: "Public account during delivery",
    },
    faqs: INSTAGRAM_FAQS,
  },

  // TikTok
  {
    slug: "tiktok-followers-100",
    name: "100 TikTok Followers",
    shortDescription: "A small boost for a new or growing TikTok account.",
    description: [
      "Add 100 followers to your TikTok account. It's the simplest way to try the service before ordering a bigger package.",
      "You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 3,
    category: "tiktok",
    quantity: 100,
    availability: "in-stock",
    images: img("tiktok-followers-100"),
    features: [
      "100 followers added to your TikTok account",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Order and follow-up on WhatsApp",
    ],
    specs: [
      { label: "Platform", value: "TikTok" },
      { label: "Quantity", value: "100 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "Same day" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed the same day",
      requirement: "Public account during delivery",
    },
    faqs: TIKTOK_FAQS,
  },
  {
    slug: "tiktok-followers-1k",
    name: "1,000 TikTok Followers",
    shortDescription: "A clear step up for creators posting regularly.",
    description: [
      "Add 1,000 followers to your TikTok account. A good fit for creators and small brands starting to post regularly.",
      "Followers are added gradually rather than all at once. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 14,
    category: "tiktok",
    quantity: 1000,
    availability: "in-stock",
    featured: true,
    images: img("tiktok-followers-1k"),
    features: [
      "1,000 followers added to your TikTok account",
      "Delivered gradually rather than all at once",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Order and follow-up on WhatsApp",
    ],
    specs: [
      { label: "Platform", value: "TikTok" },
      { label: "Quantity", value: "1,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "Within 1 day" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed within 1 day",
      requirement: "Public account during delivery",
    },
    faqs: TIKTOK_FAQS,
  },
  {
    slug: "tiktok-followers-5k",
    name: "5,000 TikTok Followers",
    shortDescription: "For accounts ready to look established.",
    description: [
      "Add 5,000 followers to your TikTok account. Suited to creators, artists and brands who already post often.",
      "Followers are added gradually over a few days. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 55,
    category: "tiktok",
    quantity: 5000,
    availability: "in-stock",
    images: img("tiktok-followers-5k"),
    features: [
      "5,000 followers added to your TikTok account",
      "Delivered gradually over 2 to 3 days",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Progress updates on WhatsApp if you ask",
    ],
    specs: [
      { label: "Platform", value: "TikTok" },
      { label: "Quantity", value: "5,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "2 to 3 days" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed in 2 to 3 days",
      requirement: "Public account during delivery",
    },
    faqs: TIKTOK_FAQS,
  },
  {
    slug: "tiktok-followers-10k",
    name: "10,000 TikTok Followers",
    shortDescription: "The largest TikTok package, with the lowest price per follower.",
    description: [
      "Add 10,000 followers to your TikTok account. It's the best value per follower in the store.",
      "Followers are added gradually over several days. You only send us your username on WhatsApp. We never ask for your password.",
    ],
    price: 95,
    category: "tiktok",
    quantity: 10000,
    availability: "in-stock",
    images: img("tiktok-followers-10k"),
    features: [
      "10,000 followers added to your TikTok account",
      "Delivered gradually over 3 to 5 days",
      "Only your username or profile link is needed",
      "We never ask for your password",
      "Progress updates on WhatsApp if you ask",
    ],
    specs: [
      { label: "Platform", value: "TikTok" },
      { label: "Quantity", value: "10,000 followers" },
      { label: "Delivery starts", value: "Within 24 hours" },
      { label: "Delivery speed", value: "3 to 5 days" },
      { label: "What we need", value: "Username or profile link" },
    ],
    delivery: {
      start: "Within 24 hours of payment",
      speed: "Usually completed in 3 to 5 days",
      requirement: "Public account during delivery",
    },
    faqs: TIKTOK_FAQS,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}

/** Other packages on the same platform first, then the other platform. */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
