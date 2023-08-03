"use client";

import { useEffect, useRef, useState } from "react";

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
}) {
  const inputRef = useRef(null);
  const suggestionListRef = useRef(null);
  const [suggestionState, setSuggestionState] = useState({
    activeOption: 0,
    showOptions: false,
  });

  const toggleOptions = (boo) => {
    setSuggestionState((old) => {
      return { ...old, showOptions: boo };
    });
  };

  useEffect(() => {
    if (
      document.activeElement === inputRef.current &&
      suggestions &&
      suggestions.length > 0
    ) {
      toggleOptions(true);
    } else {
      toggleOptions(false);
    }
  }, [suggestions]);

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      const content = suggestions[suggestionState.activeOption].description;
      setValue(name, content);
      toggleOptions(false);
    } else if (e.keyCode === 40) {
      if (suggestionState.activeOption === suggestions.length - 1) {
        return;
      }
      setSuggestionState((old) => {
        return { ...old, activeOption: old.activeOption + 1 };
      });
    } else if (e.keyCode === 38) {
      if (suggestionState.activeOption === 0) {
        return;
      }
      setSuggestionState((old) => {
        return { ...old, activeOption: old.activeOption - 1 };
      });
    }
  };

  const onMouseDownHandler = (e) => {
    const content = e.target.outerText;
    setValue(name, content);
    toggleOptions(false);
  };

  const onBlurHandler = (e) => {
    toggleOptions(false);
  };

  return (
    <div className="flex flex-col mb-2 relative">
      <label className="mb-2">{label}</label>
      <input
        ref={inputRef}
        loading={String(loading)}
        type={type}
        name={name}
        className="h-12 border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        onKeyDown={onKeyDownHandler}
        onBlur={onBlurHandler}
      />
      {suggestionState.showOptions && (
        <ul
          className="absolute flex flex-col bg-black top-24 rounded-lg w-full z-30 border border-gray-600 p-2"
          ref={suggestionListRef}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onMouseDown={onMouseDownHandler}
              className={`${
                index === suggestionState.activeOption && "bg-gray-700"
              } px-4 py-2 text-sm hover:bg-gray-700 rounded-lg cursor-pointer`}
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
