/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  ChangeEvent,
} from "react-autosuggest";

const getSuggestions = (value: string, options: any[]): any[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }

  const matches = options.filter((location: any) => {
    const labelMatch = location.label.toLowerCase().includes(inputValue);
    return labelMatch;
  });

  const suggestions = matches.map((location: any) => ({
    name: `${location.label}`,
  }));

  return suggestions;
};

const getSuggestionValue = (suggestion: any): string => suggestion.name;

const renderSuggestion = (
  suggestion: { name: string },
  inputValue: { query: string }
) => {
  const matchStart = suggestion.name
    .toLowerCase()
    .indexOf(inputValue.query.toLowerCase());
  const matchEnd = matchStart + inputValue.query.length;

  return (
    <div className="px-2 py-1.5 text-primary bg-white cursor-pointer rounded-b-[8px]">
      {matchStart >= 0 ? (
        <>
          {suggestion.name.slice(0, matchStart)}
          <span className="font-semibold">
            {suggestion.name.slice(matchStart, matchEnd)}
          </span>
          {suggestion.name.slice(matchEnd)}
        </>
      ) : (
        suggestion.name
      )}
    </div>
  );
};

const renderSuggestionsContainer = ({ containerProps, children }: any) => {
  const { key, ...rest } = containerProps;

  if (!children || React.Children.count(children) === 0) {
    return null;
  }

  return (
    <div key={key} {...rest}>
      <div className="font-medium text-primary text-base p-2 border-b border-gray5 bg-white rounded-t-[8px]">
        Search Suggestions
      </div>
      {children}
    </div>
  );
};

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  options: any;
  disabled?: any;
}

const AutocompleteSearchInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  options,
  disabled,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const onSuggestionsFetchRequested = ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    if (!disabled) {
      setSuggestions(getSuggestions(value, options));
    }
  };

  const onSuggestionsClearRequested = () => {
    if (!disabled) {
      setSuggestions([]);
    }
  };

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: (_: React.FormEvent<any>, { newValue }: ChangeEvent) => {
      if (!disabled) {
        onChange(newValue);
      }
    },
    className: `flex h-12 w-full focus:bg-lightYellow2 focus:outline-none focus:border-primary focus:border-[2px] rounded-[8px] px-3 py-2 placeholder:text-[#767676] placeholder:text-base lg:placeholder:text-lg focus:shadow-shadow1 ${
      className && className
    }`,
  };

  return (
    <div className={`relative`}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
      />
    </div>
  );
};

export default AutocompleteSearchInput;
