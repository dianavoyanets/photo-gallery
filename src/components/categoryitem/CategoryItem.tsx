import { Link } from "react-router-dom";

export interface Category {
  id: number;
  value: number;
  route: string;
}

export interface CategoryItemProps {
  value: string;
  route: string;
  isActive: boolean;
}

export const CategoryItem = ({ value, route, isActive }: CategoryItemProps) => {
  return (
    <Link to={route}>
      <span
        className={`border-black rounded-3xl font-matter  ${
          isActive ? "text-white" : "text-black"
        } text-md flex h-12 items-center justify-center px-8 py-4 uppercase bg-primary-700 text-md border-primary-700 border-[2px] leading-none  transition-all duration-[250ms] ease-in-out hover:rounded-2xl cursor-pointer whitespace-nowrap ${
          isActive ? "bg-black" : "bg-white"
        }`}
      >
        {value}
      </span>
    </Link>
  );
};
