/* eslint-disable @typescript-eslint/no-explicit-any */
import Ic_search from "@/assets/images/Ic_search.svg";
import React, { useEffect, useRef, useState } from "react";
import Autosuggest, {
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import Ic_close_black from "../../assets/images/Ic_close_black.svg";

interface Option {
  label: string;
  value: number;
}

interface MultiSelectAutoSuggestionsSkillsProps {
  value: any;
  onChange: (options: Option[]) => void;
  placeholder: string;
  className?: string;
  options?: any;
}

const MultiSelectAutoSuggestionsSkills: React.FC<
  MultiSelectAutoSuggestionsSkillsProps
> = ({ value, onChange, placeholder, className, options }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderSuggestion = (
    suggestion: { name: string },
    inputValue: { query: string }
  ) => {
    const matchStart = suggestion.name
      .toLowerCase()
      .indexOf(inputValue?.query?.toLowerCase());
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

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      const initialSelectedOptions: any = value
        .map((val: any) => {
          const matchedCountry = countries.find(
            (country) => country.value === val
          );
          return matchedCountry
            ? { label: matchedCountry.label, value: matchedCountry.value }
            : null;
        })
        .filter(Boolean);
      setSelectedOptions(initialSelectedOptions);
    }
  }, [value, countries]);

  useEffect(() => {
    if (options) {
      setCountries(options);
    }
  }, [options]);

  const getSuggestions = (inputValue: string) => {
    const input = inputValue.trim().toLowerCase();
    if (input.length === 0) return [];

    const selectedLabels = selectedOptions.map((option) =>
      option.label.toLowerCase()
    );

    return countries
      .filter((location) => {
        const locationLabel = location.label.toLowerCase();
        return (
          locationLabel.includes(input) &&
          !selectedLabels.includes(locationLabel)
        );
      })
      .map((location) => ({
        name: location.label,
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
    const newOptionLabel = suggestion.name;
    const newOption = countries.find(
      (country) => country.label === newOptionLabel
    );

    if (
      newOption &&
      !selectedOptions.some((option) => option.value === newOption.value)
    ) {
      const updatedOptions = [
        ...selectedOptions,
        { label: newOption.label, value: newOption.value },
      ];

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
      setInputValue("");
    }
  };
  useEffect(() => {
    if (selectedOptions && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [selectedOptions]);

  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter(
      (item) => item.value !== option.value
    );
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };
  const [isFocused, setIsFocused] = useState(false);

  const inputProps = {
    placeholder: inputValue == "" ? placeholder : "",
    value: inputValue,
    onChange: (_: React.FormEvent<any>, { newValue }: any) => {
      setInputValue(newValue);
    },
    className: `flex h-full rounded-[8px] px-3 py-2 placeholder:text-[#767676] placeholder:text-base lg:placeholder:text-lg border-gray7 focus:border-none focus:outline-none focus:bg-lightYellow2`,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  return (
    <>
      <div className="relative">
        <div
          // className={`flex items-center gap-2 w-full rounded-[8px] px-3 py-2 overflow-x-auto overFlowXScroll ${
          //   className || ""
          // }`}
          className={`flex items-center gap-2 w-full rounded-[8px] px-3 py-2 overflow-x-auto overFlowXScroll ${
            isFocused ? "bg-lightYellow2 shadow-shadow1" : ""
          } ${className || ""}`}
          ref={scrollRef}
        >
          <div
            className={`${
              isFocused ? "bg-lightYellow2" : "bg-white"
            } absolute top-[2px] left-[2px] h-[52px] w-[40px] rounded-[8px]`}
          >
            <img
              src={Ic_search}
              alt="search"
              className="top-[14px] left-[8px] lg:left-[12px] relative"
            />
          </div>
          {selectedOptions.length > 0 && (
            <div className="flex items-center gap-2">
              {selectedOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center bg-[#EFEFEF] text-primary text-sm rounded-[8px] px-2 py-[3.5px] gap-[4px] whitespace-nowrap w-max"
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
      </div>
    </>
  );
};

export default MultiSelectAutoSuggestionsSkills;
