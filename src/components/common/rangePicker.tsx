import React, { useEffect, useState } from "react";

interface SliderProps {
  priceGap: number;
  minPrice: number;
  maxPrice: number;
  setMinRange: (minRange: number) => void;
  setMaxRange: (minRange: number) => void;
  currencySymbol: string | null;
}

const RangeSlider: React.FC<SliderProps> = ({
  priceGap,
  minPrice: initialMinPrice,
  maxPrice: initialMaxPrice,
  setMinRange,
  setMaxRange,
  currencySymbol,
}) => {
  const [minValue, setMinValue] = useState<number>(initialMinPrice);
  const [maxValue, setMaxValue] = useState<number>(initialMaxPrice);

  const handleRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    const numericValue = parseInt(value);

    if (className === "range-min") {
      if (numericValue <= maxValue - priceGap) {
        setMinValue(numericValue);
      } else {
        setMinValue(maxValue - priceGap);
      }
    } else {
      if (numericValue >= minValue + priceGap) {
        setMaxValue(numericValue);
      } else {
        setMaxValue(minValue + priceGap);
      }
    }
  };
  useEffect(() => {
    setMinRange(minValue);
    setMaxRange(maxValue);
  }, [minValue, maxValue, setMinRange, setMaxRange]);

  return (
    <>
      <div className="Range_Picker w-full">
        <div className="price-input">
          <div className="text-primary text-[14px]">
            {currencySymbol && currencySymbol}
            {minValue === 0 ? "0" : `${Math.floor(minValue)} K`}
          </div>
          <div className="text-primary text-[14px]">
            {currencySymbol && currencySymbol}
            {maxValue === 0 ? "0" : `${Math.floor(maxValue)} K`}
          </div>
        </div>
        <div className="range-input">
          <input
            type="range"
            value={minValue}
            onChange={handleRangeInputChange}
            min={initialMinPrice}
            max={initialMaxPrice}
            className="range-min"
          />
          <input
            type="range"
            value={maxValue}
            onChange={handleRangeInputChange}
            min={initialMinPrice}
            max={initialMaxPrice}
            className="range-max"
          />
        </div>
        <div className="slider">
          <div
            className="progress"
            style={{
              left: `${
                ((minValue - initialMinPrice) /
                  (initialMaxPrice - initialMinPrice)) *
                100
              }%`,
              right: `${
                100 -
                ((maxValue - initialMinPrice) /
                  (initialMaxPrice - initialMinPrice)) *
                  100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="mt-[18px] flex items-center justify-between gap-3">
        <div className="w-full border border-gray px-4 py-2 text-primary rounded-lg">
          {currencySymbol && currencySymbol}
          {minValue === 0 ? "0" : `${Math.floor(minValue)} K`}
        </div>
        <div className="text-primary">to</div>
        <div className="w-full border border-gray px-4 py-2 text-primary rounded-lg">
          {currencySymbol && currencySymbol}
          {maxValue === 0 ? "0" : `${Math.floor(maxValue)} K`}
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
