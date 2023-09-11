import Select from "react-select";
import type { SingleValue } from "react-select";

export interface ComboboxProps {
  placeholder: string;
  options: ComboboxOption[];
  value?: ComboboxOption;
  error?: string;
  onChangeHandler: (selectedOption: ComboboxOption | null) => void;
}

export interface ComboboxOption {
  value: string;
  label: string;
}

export const Combobox = ({
  placeholder,
  options,
  value,
  onChangeHandler,
}: ComboboxProps) => {
  return (
    <div className="flex flex-col justify-end gap-2 w-full">
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={(option: SingleValue<ComboboxOption>) =>
          onChangeHandler(option)
        }
        className="md:!max-w-[300px]"
        classNames={{
          control: () => "!rounded-3xl !border-black !h-12",
        }}
      />
    </div>
  );
};
