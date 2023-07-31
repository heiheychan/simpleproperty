export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChangeHandler,
}) {
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-2">{label}</label>
      <input
        type={type}
        name={name}
        className="h-12 border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  );
}
