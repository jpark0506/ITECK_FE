import React from "react";

type Props = {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputComponent = ({ placeholder, value, onChange }: Props) => {
  return (
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
