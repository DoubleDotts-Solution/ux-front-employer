/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  ChangeEvent,
} from "react-autosuggest";

const getSuggestions = (
  value: string,
  categories: any[],
  selectedValues: string[]
): any[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }

  return categories.filter(
    (location: any) =>
      location.category.toLowerCase().includes(inputValue) &&
      !selectedValues.includes(location.category)
  );
};

const getSuggestionValue = (suggestion: any): string => suggestion.category;

const renderSuggestion = (
  suggestion: { category: string },
  inputValue: { query: string }
) => {
  const matchStart = suggestion.category
    .toLowerCase()
    .indexOf(inputValue.query.toLowerCase());
  const matchEnd = matchStart + inputValue.query.length;

  return (
    <div className="px-2 py-1.5 text-primary bg-white cursor-pointer">
      {matchStart >= 0 ? (
        <>
          {suggestion.category.slice(0, matchStart)}
          <span className="font-semibold">
            {suggestion.category.slice(matchStart, matchEnd)}
          </span>
          {suggestion.category.slice(matchEnd)}
        </>
      ) : (
        suggestion.category
      )}
    </div>
  );
};

const renderSuggestionsContainer = ({ containerProps, children }: any) => {
  if (!children || React.Children.count(children) === 0) {
    return null;
  }

  return (
    <div {...containerProps}>
      <div className="font-medium text-primary text-base p-2 border-b border-gray5 bg-white">
        Search Suggestions
      </div>
      {children}
    </div>
  );
};

interface AutocompleteInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  className?: string;
}

const AutocompleteInputMultiple: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const categories = [
    { category: "UX Design" },
    { category: "UX and UI Designer" },
    { category: "UX" },
    { category: "UX Research" },
    { category: "UX Writer" },
    { category: "UX Writing" },
    { category: "UI UX Developer" },
  ];

  const handleAdd = (newValue: string) => {
    if (newValue && !value.includes(newValue)) {
      onChange([...value, newValue]);
      setInputValue("");
    }
  };

  const onSuggestionsFetchRequested = ({
    value: inputValue,
  }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(inputValue, categories, value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: value.length === 0 ? placeholder : "",
    value: inputValue,
    onChange: (_: React.FormEvent<any>, { newValue }: ChangeEvent) => {
      setInputValue(newValue);
    },
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && inputValue.trim()) {
        handleAdd(inputValue.trim());
        event.preventDefault();
      }
    },
    className:
      "focus:bg-lightYellow2 focus:outline-none focus:border-gray7 focus:border-[3px] h-10 lg:h-12 w-full flex h-10 lg:h-12 w-full focus:bg-lightYellow2 focus:outline-none focus:border-gray7 focus:border-[3px] rounded-[8px] px-3 py-2 placeholder:text-[#767676] placeholder:text-lg w-full",
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex flex-nowrap items-center gap-2 border border-gray-300 bg-white overflow-hidden h-10 lg:h-12 w-full focus:bg-lightYellow2 focus:outline-none focus:border-gray7 focus:border-[3px] rounded-[8px] py-2 placeholder:text-[#767676] placeholder:text-lg"
        onClick={() => document.querySelector("input")?.focus()}
      >
        {value.map((item, index) => (
          <span
            key={item}
            className="flex items-center rounded-full whitespace-nowrap"
          >
            {item}
            {index < value.length && ", "}
          </span>
        ))}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSuggestionsContainer={renderSuggestionsContainer}
          inputProps={inputProps}
          onSuggestionSelected={(_, { suggestion }) =>
            handleAdd(suggestion.category)
          }
        />
      </div>
    </div>
  );
};

export default AutocompleteInputMultiple;
