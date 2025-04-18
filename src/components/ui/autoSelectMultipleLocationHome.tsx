/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiUtils from "@/api/ApiUtils";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
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

  const matches = categories.filter((location: any) => {
    const cityMatch = location.city.toLowerCase().includes(inputValue);
    const stateMatch = location.states.toLowerCase().includes(inputValue);
    return cityMatch || stateMatch;
  });

  const suggestions = matches.map((location: any) => ({
    name: `${location.city}, ${location.states}`,
  }));

  const filteredSuggestions = suggestions.filter((sug) => {
    return !selectedValues.some((selectedValue) =>
      sug.name.includes(selectedValue)
    );
  });

  return filteredSuggestions;
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
    <div className="px-2 py-1.5 text-primary bg-white cursor-pointer">
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
const AutocompleteInputMultipleLocationHome: React.FC<
  AutocompleteInputProps
> = ({ value, onChange, placeholder, className }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const locationContainerRef = useRef<HTMLDivElement>(null);

  const [countries, setCountries] = useState<any[]>([]);

  const fetchCountries = async (inputValue: string) => {
    try {
      const response: any = await ApiUtils.getLocation(inputValue);

      const countriesWithStates = response?.data?.data?.map((country: any) => {
        return {
          city: country.city,
          states: country.state,
        };
      });

      setCountries(countriesWithStates);
      const suggestionsList = countriesWithStates
        .filter((location: any) =>
          `${location.city}, ${location.states}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
        .map((location: any) => ({
          name: `${location.city}, ${location.states}`,
        }));

      setSuggestions(suggestionsList);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (inputValue) {
      fetchCountries(inputValue);
    }
  }, [inputValue]);

  const categories = [...countries];

  const handleAdd = (newValue: string) => {
    if (newValue && !value.includes(newValue)) {
      onChange([...value, newValue]);
      setInputValue("");
    }
  };
  useEffect(() => {
    if (locationContainerRef.current) {
      locationContainerRef.current.scrollLeft =
        locationContainerRef.current.scrollWidth;
    }
  }, [value]);

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
      } else if (
        event.key === "Backspace" &&
        inputValue === "" &&
        value.length > 0
      ) {
        const lastItem = value[value.length - 1];
        if (lastItem.length > 1) {
          const newLastItem = lastItem.slice(0, lastItem.length - 1);
          onChange(value.slice(0, value.length - 1));
          setInputValue(newLastItem);
        } else {
          onChange(value.slice(0, value.length - 1));
          setInputValue("");
        }
      }
    },
    className:
      "h-12 w-full focus:outline-none flex rounded-[8px] pr-3 py-2 placeholder:text-[#767676] placeholder:text-lg min-w-[50px]",
    id: "autocomplete-input-multi-location",
  };

  return (
    <div className={`relative ${className}`} ref={locationContainerRef}>
      <div
        className="flex flex-nowrap items-center gap-2 border border-gray-300 bg-white overflow-x-auto overflow-y-hidden overFlowScrollHidden h-12 w-full rounded-[8px] py-2 pl-3"
        onClick={() =>
          document.getElementById("autocomplete-input-multi-location")?.focus()
        }
      >
        {value.map((item, index) => (
          <span
            key={item}
            className="flex items-center rounded-full whitespace-nowrap py-1 text-lg text-primary"
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
            handleAdd(suggestion.name)
          }
        />
        {inputValue && (
          <X
            className="absolute right-0 m-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => setInputValue("")}
          />
        )}
      </div>
    </div>
  );
};

export default AutocompleteInputMultipleLocationHome;
