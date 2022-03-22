import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Context from './context';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const context = {
    planets,
    setPlanets,
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
