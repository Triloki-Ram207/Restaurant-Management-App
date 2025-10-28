import React, { useRef } from "react";
import "../cssFiles/categoryMenu.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryMenu = ({ selected, onSelect, categories }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="category-menu-wrapper">
      <button className="scroll-arrow left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      <div className="category-scroll" ref={scrollRef}>
        {Object.entries(categories).map(([category, items]) => {
          const icon = items[0]?.icon || "🍽️"; // fallback icon if missing
          return (
            <button
              key={category}
              className={`category-btn ${selected === category ? "selected" : ""}`}
              onClick={() => onSelect(category)}
            >
              {icon}
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      <button className="scroll-arrow right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CategoryMenu;
