/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCompanyQuery } from "@/store/slice/apiSlice/categoryApi";
import { useGetSkillsQuery } from "@/store/slice/apiSlice/profileApi";
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
const AutocompleteInputMultiple: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const params: any = {
    page: 1,
    limit: 99999999999,
    value: "",
  };

  const { data: skills } = useGetSkillsQuery(params);
  const skillsName = (skills as any)?.data || [];
  const { data } = useGetAllCompanyQuery(params);
  const AllCompanies = (data as any)?.data || [];

  const skillCategories = skillsName.map((skill: any) => ({
    category: skill.name,
  }));

  const companyCategories = AllCompanies.map((company: any) => ({
    category: company.company_name,
  }));

  const categories = [...skillCategories, ...companyCategories];

  const handleAdd = (newValue: string) => {
    if (newValue && !value.includes(newValue)) {
      onChange([...value, newValue]);
      setInputValue("");
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
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
      "h-10 lg:h-12 w-full focus:outline-none flex rounded-[8px] pr-3 py-2 placeholder:text-[#767676] placeholder:text-lg min-w-[50px]",
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        className="flex flex-nowrap items-center gap-2 border border-gray-300 bg-white overflow-x-auto overflow-y-hidden overFlowScrollHidden h-10 lg:h-12 w-full rounded-[8px] py-2 pl-3"
        onClick={() => document.querySelector("input")?.focus()}
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
            handleAdd(suggestion.category)
          }
        />
      </div>
    </div>
  );
};

export default AutocompleteInputMultiple;
