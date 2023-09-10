import Select from "react-select";

export interface ComboboxProps {
  label: string;
  placeholder: string;
  options: ComboboxOption[];
  value?: ComboboxOption;
  error?: string;
  onChangeHandler: (selectedOption: ComboboxOption) => void;
}

export interface ComboboxOption {
  value: number;
  label: string;
}

export const Combobox = ({
  label,
  placeholder,
  options,
  value,
  onChangeHandler,
}: ComboboxProps) => {
  return (
    <div className="flex justify-end gap-2">
      <label
        htmlFor={label.toLowerCase()}
        className="self-center block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <Select
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChangeHandler}
        className="w-full"
      />
    </div>
  );
};
