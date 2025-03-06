import React from 'react';
import { useParams } from 'react-router-dom';

export default function SearchResults() {
  const { category } = useParams();

  return (
    <div className="search-results-container">
      <h1>Search Results: {category}</h1>
    </div>
  );
} 