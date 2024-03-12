const Input = ({ handleChange, handleKeyDown, input }) => {
  return (
    <>
      <input
        className="input"
        type="text"
        placeholder="add your task here!"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={input}
      />
    </>
  );
};

export default Input;
