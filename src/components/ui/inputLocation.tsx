/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiUtils from "@/api/ApiUtils";
import React, { useEffect, useState } from "react";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  ChangeEvent,
} from "react-autosuggest";

const getSuggestions = (value: string, countries: any[]): any[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  }

  const matches = countries.filter((location: any) => {
    const cityMatch = location.city.toLowerCase().includes(inputValue);
    const stateMatch = location.states.toLowerCase().includes(inputValue);
    return cityMatch || stateMatch;
  });

  const suggestions = matches.map((location: any) => ({
    name: `${location.city}, ${location.states}`,
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
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

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
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (value) {
      fetchCountries(value);
    }
  }, [value]);

  const onSuggestionsFetchRequested = ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value, countries));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: (_: React.FormEvent<any>, { newValue }: ChangeEvent) => {
      onChange(newValue);
    },
    className: `flex h-10 lg:h-12 w-full focus:bg-lightYellow2 focus:outline-none focus:border-primary focus:border-[2px] rounded-[8px] px-3 py-2 placeholder:text-[#767676] placeholder:text-lg focus:shadow-shadow1 ${
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

export default AutocompleteInput;
