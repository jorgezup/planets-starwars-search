import React, { useContext } from 'react';
import Context from '../context/context';

const Table = () => {
  const {
    planets,
    filters,
    isSortedClicked,
    sortPlanets,
  } = useContext(Context);

  let filteredPlanets = planets
    .sort((a, b) => a.name.localeCompare(b.name));

  if (filters.filterByName === '' && filters.filterBy.length === 0) {
    filteredPlanets = planets;
  } else {
    const { filterByName, filterBy } = filters;
    if (filterByName) {
      const filtered = planets
        .filter(({ name }) => name.toLowerCase()
          .includes(filterByName.toLowerCase()));
      filteredPlanets = filtered;
    }
    if (filterBy.length > 0) {
      filterBy.forEach(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          const filtered = filteredPlanets.filter(
            (planet) => Number(planet[column]) > Number(value),
          );
          filteredPlanets = filtered;
        } else if (comparison === 'menor que') {
          const filtered = filteredPlanets.filter(
            (planet) => Number(planet[column]) < Number(value),
          );
          filteredPlanets = filtered;
        } else if (comparison === 'igual a') {
          const filtered = filteredPlanets.filter(
            (planet) => Number(planet[column]) === Number(value),
          );
          filteredPlanets = filtered;
        }
      });
    }
  }

  if (isSortedClicked) {
    filteredPlanets = sortPlanets(filteredPlanets);
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
        {filteredPlanets
          .map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
