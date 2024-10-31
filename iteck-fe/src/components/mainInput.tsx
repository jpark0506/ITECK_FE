type Props = {
  placeholder: string;
};
const InputComponent = (props: Props) => {
  const { placeholder } = props;
  return (
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
