import { useLocation } from "react-router";
import { CategoryItem, Category } from "../categoryitem/CategoryItem";

export interface CategoriesProps {
  categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
  const location = useLocation();

  return (
    <div className="flex justify-between gap-y-14 w-[100vw]">
      <div className="flex gap-x-4 gap-y-2 overflow-x-auto pb-5">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            {...category}
            isActive={location.pathname === category.route}
          />
        ))}
      </div>
    </div>
  );
};
