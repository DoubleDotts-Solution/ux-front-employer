/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

interface TagsDisplayProps {
  tags: { id: number; name: string }[];
}

const JobTagsDisplay: React.FC<TagsDisplayProps> = ({ tags }) => {
  const [displayedTags, setDisplayedTags] = useState<
    { id?: number; name: string }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [moreIndex, setMoreIndex] = useState<number | null>(null);

  const updateTags = () => {
    let tagsToShow: { id?: number; name: string }[] = [];

    if (window.matchMedia("(max-width: 575px)").matches) {
      tagsToShow = tags?.slice(0, 1);
      if (tags?.length > 1) {
        tagsToShow.push({ name: `+${tags?.length - 1} More` });
      }
    } else if (
      window.matchMedia("(min-width: 576px) and (max-width: 767px)").matches
    ) {
      tagsToShow = tags?.slice(0, 2);
      if (tags?.length > 2) {
        tagsToShow.push({ name: `+${tags?.length - 2} More` });
      }
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches
    ) {
      tagsToShow = tags?.slice(0, 3);
      if (tags?.length > 3) {
        tagsToShow.push({ name: `+${tags?.length - 3} More` });
      }
    } else if (
      window.matchMedia("(min-width: 992px) and (max-width: 1279px)").matches
    ) {
      tagsToShow = tags?.slice(0, 2);
      if (tags?.length > 2) {
        tagsToShow.push({ name: `+${tags?.length - 2} More` });
      }
    } else if (
      window.matchMedia("(min-width: 1280px) and (max-width: 1600px)").matches
    ) {
      tagsToShow = tags?.slice(0, 3);
      if (tags?.length > 3) {
        tagsToShow.push({ name: `+${tags?.length - 3} More` });
      }
    } else if (window.matchMedia("(min-width: 1601px)").matches) {
      tagsToShow = tags?.slice(0, 4);
      if (tags?.length > 4) {
        tagsToShow.push({ name: `+${tags?.length - 4} More` });
      }
    } else {
      tagsToShow = tags;
    }

    setDisplayedTags(tagsToShow);
  };

  useEffect(() => {
    updateTags();

    window.addEventListener("resize", updateTags);

    return () => {
      window.removeEventListener("resize", updateTags);
    };
  }, [tags]);

  const toggleDropdown = (e: any, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
    setMoreIndex(index);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 desktop:gap-5">
      {displayedTags?.map((tag, index) => (
        <div key={index} className="relative">
          <div
            className="border border-gray text-xs sm:text-sm md:text-base desktop:text-lg bg-lightChiku2 px-3 desktop:px-5 py-1 rounded-full"
            onClick={
              tag.name.includes("More")
                ? (e) => toggleDropdown(e, index)
                : undefined
            }
          >
            {tag.name}
          </div>
          {isDropdownOpen && moreIndex === index && (
            <div
              className="absolute top-full mt-2 bg-white border border-gray py-3 px-4 rounded-lg shadow-lg w-max"
              style={{ zIndex: 999999999999999 }}
            >
              <ul>
                {tags.slice(displayedTags.length - 1).map((fullTag, idx) => (
                  <li key={idx} className="py-1 text-sm text-primary">
                    {fullTag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobTagsDisplay;
