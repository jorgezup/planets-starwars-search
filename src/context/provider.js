import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Context from './context';
import { MINUS_ONE } from '../utils/constants';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: '',
    filterBy: [],
  });
  const [isSortedClicked, setIsSortedClicked] = useState(false);
  const [sortState, setSortState] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const sortPlanets = (array) => {
    const { order } = sortState;
    return array.sort((a, b) => {
      if (a[order.column] === 'unknown') return 1;
      if (b[order.column] === 'unknown') return MINUS_ONE;
      if (order.sort === 'ASC') return a[order.column] - b[order.column];
      if (order.sort === 'DESC') return b[order.column] - a[order.column];
      return true;
    });
  };

  const context = {
    planets,
    setPlanets,
    filters,
    setFilters,
    isSortedClicked,
    setIsSortedClicked,
    sortState,
    setSortState,
    sortPlanets,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default Provider;
