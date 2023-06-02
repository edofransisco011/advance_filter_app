import React, { useState } from 'react';
import data from './database';

const FilterForm = ({ onFilter }) => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [excludedCities, setExcludedCities] = useState([]);
  const [showRefreshPopup, setShowRefreshPopup] = useState(false);

  const handleFilter = (e) => {
    e.preventDefault();
    setShowRefreshPopup(false);

    const filteredData = data.filter((person) => {
      if (minAge && person.age < minAge) {
        return false;
      }
      if (maxAge && person.age > maxAge) {
        return false;
      }

      if (nameFilter) {
        if (nameFilter.includes('!')) {
          const excludedName = nameFilter.slice(1);
          if (person.name.toLowerCase().includes(excludedName.toLowerCase())) {
            return false;
          }
        } else {
          if (!person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
            return false;
          }
        }
      }

      if (excludedCities.length > 0) {
        const personCity = person.city.toLowerCase();
        for (const city of excludedCities) {
          if (city.toLowerCase().includes(personCity) || personCity.includes(city.toLowerCase())) {
            return false;
          }
        }
      }

      return true;
    });

    onFilter(filteredData);
  };

  const handleInputChange = () => {
    setShowRefreshPopup(true);
  };

  return (
    <form onSubmit={handleFilter} className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="minAge" className="text-sm font-medium text-gray-700 mb-2">
            Min Age:
          </label>
          <input
            id="minAge"
            type="number"
            value={minAge}
            onChange={(e) => {
              setMinAge(e.target.value);
              handleInputChange();
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxAge" className="text-sm font-medium text-gray-700 mb-2">
            Max Age:
          </label>
          <input
            id="maxAge"
            type="number"
            value={maxAge}
            onChange={(e) => {
              setMaxAge(e.target.value);
              handleInputChange();
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nameFilter" className="text-sm font-medium text-gray-700 mb-2">
            Name Filter:
          </label>
          <input
            id="nameFilter"
            type="text"
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
              handleInputChange();
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="excludedCities" className="text-sm font-medium text-gray-700 mb-2">
            Excluded Cities:
          </label>
          <input
            id="excludedCities"
            type="text"
            value={excludedCities.join(', ')}
            onChange={(e) => {
              setExcludedCities(e.target.value.split(',').map((city) => city.trim()));
              handleInputChange();
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
      >
        Filter
      </button>
      {showRefreshPopup && (
        <p className="text-red-500 mt-2">Please refresh the page to update the filters.</p>
      )}
    </form>
  );
};

export default FilterForm;
