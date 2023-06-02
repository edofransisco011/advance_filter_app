import React, { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import FilterForm from './FilterForm';
import DatabaseTable from './DatabaseTable';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleGithubLink = () => {
    window.location.href = 'https://github.com/edofransisco011/advance_filter_app';
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={handleGithubLink}
      >
        <FiGithub className="mr-2" />
        Source Code
      </button>
      <FilterForm onFilter={handleFilter} />
      <DatabaseTable data={filteredData} />
    </div>
  );
};

export default App;