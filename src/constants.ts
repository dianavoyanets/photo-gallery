import type { Category } from "./components/categoryitem/CategoryItem";

export const defaultCategories: Category[] = [
  { id: "all", value: "All", route: "/" },
  { id: "favourites", value: "Favourites", route: "/photo/favourites" },
];
