"use client";

export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  setValue,
  onChangeHandler,
  loading,
  suggestions,
  setSuggestions,
}) {
  const selectSuggestionHandler = (val) => {
    setValue((old) => {
      return { ...old, address: val };
    });
    setSuggestions("");
  };

  return (
    <div className="flex flex-col mb-2 relative">
      <label className="mb-2">{label}</label>
      <input
        loading={String(loading)}
        type={type}
        name={name}
        className="h-12 border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
      {suggestions && suggestions.length > 0 && (
        <ul className="absolute flex flex-col bg-black top-24 rounded-lg w-full z-30 border border-gray-600 p-2">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              className="px-4 py-2 text-sm hover:bg-gray-700 rounded-lg cursor-pointer"
              onClick={() => {
                selectSuggestionHandler(item.description);
              }}
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
