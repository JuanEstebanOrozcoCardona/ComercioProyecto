import React from 'react';

const Filter = ({ onFilterChange }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        className="filter-input"
        placeholder="Buscar productos..."
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;