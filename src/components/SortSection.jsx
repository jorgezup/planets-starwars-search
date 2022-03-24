import React, { useContext } from 'react';
import Context from '../context/context';
import { COLUMN_FILTER } from '../utils/constants';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const SortSection = () => {
  const { setIsSortedClicked, sortState, setSortState } = useContext(Context);

  const handleChangeSort = ({ target: { name, value } }) => {
    setSortState((prevStaste) => ({
      order: {
        ...prevStaste.order,
        [name]: value,
      },
    }));
  };

  const { order } = sortState;

  return (
    <>
      <Select
        label="Column Sort"
        name="column"
        data-testid="column-sort"
        options={ COLUMN_FILTER }
        value={ order.column }
        onChange={ handleChangeSort }
      />

      <Input
        name="sort"
        label="Ascendent"
        type="radio"
        data-testid="column-sort-input-asc"
        value="ASC"
        checked={ order.sort === 'ASC' ? 'checked' : '' }
        onChange={ handleChangeSort }
      />

      <Input
        name="sort"
        label="Descendent"
        type="radio"
        data-testid="column-sort-input-desc"
        value="DESC"
        checked={ order.sort === 'DESC' ? 'checked' : '' }
        onChange={ handleChangeSort }
      />
      <Button
        data-testid="column-sort-button"
        onClick={ () => setIsSortedClicked(true) }
      >
        Sort

      </Button>
    </>
  );
};

export default SortSection;
