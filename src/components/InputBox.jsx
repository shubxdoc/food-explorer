const InputBox = ({ placeholder, value, onChange }) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-transparent border-2 border-opacity-50 focus:shadow-md duration-300 py-2 px-3 border-textClr outline-none rounded-xl w-1/2`}
      />
    </>
  );
};

export default InputBox;
