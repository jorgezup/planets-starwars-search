import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { name, label } = props;
  return (
    <label htmlFor={ name }>
      {label}
      <input { ...props } />
    </label>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Input;
