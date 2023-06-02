import React from 'react';

const DatabaseTable = ({ data }) => {
  return (
    <table className="w-full mt-4 border-collapse border rounded-md">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-400">Name</th>
          <th className="px-4 py-2 border border-gray-400">Age</th>
          <th className="px-4 py-2 border border-gray-400">Email</th>
          <th className="px-4 py-2 border border-gray-400">City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border border-gray-400">{item.name}</td>
            <td className="px-4 py-2 border border-gray-400">{item.age}</td>
            <td className="px-4 py-2 border border-gray-400">{item.email}</td>
            <td className="px-4 py-2 border border-gray-400">{item.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DatabaseTable;


