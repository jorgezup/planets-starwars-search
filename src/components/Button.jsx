import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { type, children } = props;
  return (
    <button { ...props } type={ type === 'submit' ? 'submit' : 'button' }>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
}.isRequired;

export default Button;
