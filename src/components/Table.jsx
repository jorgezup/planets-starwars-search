import React, { useContext } from 'react';
import Context from '../context/context';

const Table = () => {
  const { planets, filters } = useContext(Context);

  const { nameFilter } = filters;

  let filtered = planets;

  if (nameFilter) {
    filtered = planets.filter(({ name }) => name.includes(nameFilter));
  }

  if (Object.keys(filters.filterBy).length > 0) {
    const { column, comparison, value } = filters.filterBy;

    filtered = planets.filter((planet) => planet[comparison] !== 'unknown');

    if (comparison === 'maior que') {
      filtered = planets.filter(
        (planet) => Number(planet[column]) > Number(value),
      );
    } else if (comparison === 'menor que') {
      filtered = planets.filter(
        (planet) => Number(planet[column]) < Number(value),
      );
    } else if (comparison === 'igual a') {
      filtered = planets.filter(
        (planet) => Number(planet[column]) === Number(value),
      );
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
