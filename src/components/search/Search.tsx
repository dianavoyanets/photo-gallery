import { useState } from "react";
import SearchIcon from "../../assets/ic_search.svg";

export interface SearchInputProps {
  value?: string;
  onSearch: (value: string) => void;
}

export const SearchInput = ({ value, onSearch }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");

  const onChangeHandler = (newValue: string) => {
    setInputValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="flex w-full justify-end">
      <div className="w-full relative md:max-w-[500px]">
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          className="relative z-10 h-12 cursor-pointer caret-inherit rounded-full border-black border bg-transparent outline-none pl-16 pr-4 w-full"
          value={inputValue}
          onChange={(event) => onChangeHandler(event.target.value)}
        />
        <img
          src={SearchIcon}
          className="absolute inset-y-0 my-auto px-3.5"
          alt="search-icon"
        />
      </div>
    </div>
  );
};
