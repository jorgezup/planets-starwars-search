import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const { name, label, options } = props;
  return (
    <label htmlFor={ name }>
      {label}
      <select { ...props }>
        {options.map((optionItem) => (
          <option key={ optionItem } value={ optionItem }>
            {optionItem}
          </option>
        ))}
      </select>
    </label>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Select;
