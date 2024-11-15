// src/components/MainMenu/Filters.jsx
import React, { useState } from 'react';

const Filters = () => {
  const [filters, setFilters] = useState({
    start: '',
    end: '',
    route: '',
    departure: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    // Implementar lógica para filtrar viajes
    // Por ejemplo, emitir eventos o actualizar el estado global
    console.log('Filtros aplicados:', filters);
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Filtros de Viaje</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="start"
          value={filters.start}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Punto de Inicio"
        />
        <input
          type="text"
          name="end"
          value={filters.end}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Punto de Destino"
        />
        <input
          type="text"
          name="route"
          value={filters.route}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Ruta"
        />
        <input
          type="time"
          name="departure"
          value={filters.departure}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Hora de Salida"
        />
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          placeholder="Precio Máximo"
          min="0"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleFilter}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
