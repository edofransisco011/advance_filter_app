import React, { useState } from 'react';
import data from './database';

const FilterForm = ({ onFilter }) => {
  const [ageComparison, setAgeComparison] = useState('lower');
  const [age, setAge] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [cityComparison, setCityComparison] = useState('include');
  const [showRefreshPopup, setShowRefreshPopup] = useState(false);

  const handleFilter = (e) => {
    e.preventDefault();
    setShowRefreshPopup(false);

    const filteredData = data.filter((person) => {
      if (ageComparison === 'lower' && person.age >= age) {
        return false;
      }
      if (ageComparison === 'higher' && person.age <= age) {
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

      if (cityFilter) {
        const personCity = person.city.toLowerCase();
        const filterCity = cityFilter.toLowerCase();
        if (
          (cityComparison === 'include' && !personCity.includes(filterCity)) ||
          (cityComparison === 'exclude' && personCity.includes(filterCity))
        ) {
          return false;
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
          <label htmlFor="ageComparison" className="text-sm font-medium text-gray-700 mb-2">
            Age Comparison:
          </label>
          <div className="flex">
            <select
              id="ageComparison"
              value={ageComparison}
              onChange={(e) => {
                setAgeComparison(e.target.value);
                handleInputChange();
              }}
              className="w-1/3 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lower">Lower</option>
              <option value="higher">Higher</option>
            </select>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                handleInputChange();
              }}
              className="w-2/3 rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="cityComparison" className="text-sm font-medium text-gray-700 mb-2">
            City Comparison:
          </label>
          <div className="flex">
            <select
              id="cityComparison"
              value={cityComparison}
              onChange={(e) => {
                setCityComparison(e.target.value);
                handleInputChange();
              }}
              className="w-1/3 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="include">Include</option>
              <option value="exclude">Exclude</option>
            </select>
            <input
              id="cityFilter"
              type="text"
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                handleInputChange();
              }}
              className="w-2/3 rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
