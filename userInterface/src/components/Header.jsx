import React from 'react';
import '../cssFiles/header.css';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
};

const Header = ({ searchTerm, setSearchTerm,type=false }) => (
  <header className="header">
    <h2>{getGreeting()}.</h2>
    <p>Place your order here.</p>
    <div className="search-filter-wrapper">
      <input
        type="text"
        placeholder="Search..."
        className="search-filter-input"
        value={searchTerm}
        readOnly={type}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="search-filter-icon" />
    </div>
  </header>
);

export default Header;
