import React, { useEffect, useState } from "react";

interface TagsDisplayProps {
  tags: string[];
}

const JobTagsDisplay: React.FC<TagsDisplayProps> = ({ tags }) => {
  const [displayedTags, setDisplayedTags] = useState<string[]>([]);

  const updateTags = () => {
    let tagsToShow: string[] = [];

    if (window.matchMedia("(max-width: 575px)").matches) {
      tagsToShow = tags.slice(0, 1);
      if (tags.length > 1) {
        tagsToShow.push(`+${tags.length - 1} More`);
      }
    } else if (
      window.matchMedia("(min-width: 576px) and (max-width: 767px)").matches
    ) {
      tagsToShow = tags.slice(0, 2);
      if (tags.length > 2) {
        tagsToShow.push(`+${tags.length - 2} More`);
      }
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches
    ) {
      tagsToShow = tags.slice(0, 3);
      if (tags.length > 3) {
        tagsToShow.push(`+${tags.length - 3} More`);
      }
    } else if (
      window.matchMedia("(min-width: 992px) and (max-width: 1279px)").matches
    ) {
      tagsToShow = tags.slice(0, 2);
      if (tags.length > 2) {
        tagsToShow.push(`+${tags.length - 2} More`);
      }
    } else if (
      window.matchMedia("(min-width: 1280px) and (max-width: 1600px)").matches
    ) {
      tagsToShow = tags.slice(0, 3);
      if (tags.length > 3) {
        tagsToShow.push(`+${tags.length - 3} More`);
      }
    } else if (window.matchMedia("(min-width: 1601px)").matches) {
      tagsToShow = tags.slice(0, 4);
      if (tags.length > 4) {
        tagsToShow.push(`+${tags.length - 4} More`);
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

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-5">
      {displayedTags.map((tag, index) => (
        <div
          key={index}
          className="border border-gray text-base desktop:text-lg bg-lightChiku2 px-3 desktop:px-5 py-1 rounded-full"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default JobTagsDisplay;
