import { useLocation } from "react-router";
import { CategoryItem } from "../categoryitem/CategoryItem";
import { Category } from "../categoryitem/types";

export interface CategoriesProps {
  categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
  const location = useLocation();

  return (
    <nav className="flex justify-between gap-y-14 w-[100vw]">
      <ul className="flex gap-x-4 gap-y-2 overflow-x-auto pb-5">
        {categories.map((category) => (
          <li key={category.value}>
            <CategoryItem
              {...category}
              isActive={location.pathname === category.route}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
