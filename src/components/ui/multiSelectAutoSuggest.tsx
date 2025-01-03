/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import Ic_close_black from "../../assets/images/Ic_close_black.svg";
import ApiUtils from "@/api/ApiUtils";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectAutoSuggestionsProps {
  value: any;
  onChange: (options: Option[]) => void;
  placeholder: string;
  className?: string;
}

const MultiSelectAutoSuggestions: React.FC<MultiSelectAutoSuggestionsProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCountries = async (inputValue: string) => {
    try {
      const response: any = await ApiUtils.getLocation(inputValue);
      const countriesWithStates = response?.data?.data?.map((country: any) => ({
        city: country.city,
        states: country.state,
      }));
      setCountries(countriesWithStates);
    } catch (err) {
      console.error(err);
    }
  };

  const renderSuggestion = (
    suggestion: { name: string },
    inputValue: { query: string }
  ) => {
    const matchStart = suggestion.name
      .toLowerCase()
      .indexOf(inputValue?.query?.toLowerCase());
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

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      const initialSelectedOptions = value.map((val: string) => ({
        label: val,
        value: val,
      }));
      setSelectedOptions(initialSelectedOptions);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue) {
      fetchCountries(inputValue);
    }
  }, [inputValue]);

  const getSuggestions = (inputValue: string) => {
    const input = inputValue.trim().toLowerCase();
    if (input.length === 0) return [];

    return countries
      .filter(
        (location) =>
          location.city.toLowerCase().includes(input) ||
          location.states.toLowerCase().includes(input)
      )
      .map((location) => ({
        name: `${location.city}, ${location.states}`,
      }));
  };

  const onSuggestionsFetchRequested = ({
    value,
  }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSelectOption = (suggestion: any) => {
    const newOptionValue = suggestion.name;
    if (!selectedOptions.some((option) => option.value === newOptionValue)) {
      const updatedOptions = [
        ...selectedOptions,
        { label: newOptionValue, value: newOptionValue },
      ];
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
      setInputValue("");
    }
  };

  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter(
      (item) => item.value !== option.value
    );
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const inputProps = {
    placeholder,
    value: inputValue,
    onChange: (_: React.FormEvent<any>, { newValue }: any) => {
      setInputValue(newValue);
    },
    className: `focus:border-none focus:outline-none flex items-center h-full placeholder:text-[#767676] placeholder:text-lg`,
    ref: inputRef,
  };

  // useEffect(() => {
  //   onChange(selectedOptions);
  // }, [selectedOptions, onChange]);

  return (
    <div
      className={`flex flex-wrap gap-2 min-h-10 lg:min-h-12 max-h-auto w-full rounded-[8px] px-3 py-2 ${
        className || ""
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center bg-[#EFEFEF] text-primary text-sm rounded-[8px] px-2 py-[3.5px] gap-[4px]"
            >
              {option.label}
              <img
                src={Ic_close_black}
                alt="close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveOption(option);
                }}
                className="cursor-pointer w-[20px] h-[20px]"
              />
            </div>
          ))}
        </div>
      )}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion: any) => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(_, { suggestion }) =>
          handleSelectOption(suggestion)
        }
      />
    </div>
  );
};

export default MultiSelectAutoSuggestions;
