// src/components/MainMenu/Filters.jsx
import React from 'react';

const Filters = () => {
  return (
    <div className="bg-gray-800 p-4 rounded mb-6">
      <h3 className="text-lg font-bold mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Cupos mínimos</label>
          <input
            type="number"
            min="1"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Punto de salida</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
