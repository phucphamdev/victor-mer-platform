// Collection Type options
export const collectionTypes = [
  { value: "custom", label: "Custom" },
  { value: "seasonal", label: "Seasonal" },
  { value: "trending", label: "Trending" },
  { value: "new-arrival", label: "New Arrival" },
  { value: "best-seller", label: "Best Seller" },
  { value: "featured", label: "Featured" },
  { value: "sale", label: "Sale" },
];

// Popular emoji icons for collections
export const collectionIcons = [
  { emoji: "🎁", label: "Gift" },
  { emoji: "⭐", label: "Star" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "💎", label: "Diamond" },
  { emoji: "🌟", label: "Sparkle" },
  { emoji: "🎉", label: "Party" },
  { emoji: "🏆", label: "Trophy" },
  { emoji: "💝", label: "Heart Gift" },
  { emoji: "🎊", label: "Confetti" },
  { emoji: "✨", label: "Sparkles" },
  { emoji: "🌸", label: "Flower" },
  { emoji: "🎯", label: "Target" },
  { emoji: "🚀", label: "Rocket" },
  { emoji: "💫", label: "Dizzy" },
  { emoji: "🌈", label: "Rainbow" },
  { emoji: "🎨", label: "Art" },
  { emoji: "🏅", label: "Medal" },
  { emoji: "👑", label: "Crown" },
  { emoji: "🎪", label: "Circus" },
  { emoji: "🌺", label: "Hibiscus" },
];

// Helper function to generate slug from name
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
