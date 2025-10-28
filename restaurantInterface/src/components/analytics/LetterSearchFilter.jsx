import React from 'react';
import '../../cssFiles/letterSearchFilter.css';

const LetterSearchFilter = ({ setSearchQuery,readType }) => {
  return (
    <div className="search-filter-wrapper">
      <input
        type="text"
        className="search-filter-input"
        placeholder="Filter..."
        onChange={(e) => setSearchQuery(e.target.value)}
        readOnly={readType}
      />
      <div className="search-filter-icon" />
    </div>
  );
};

export default LetterSearchFilter;
