import React, { useEffect, useContext, useState } from 'react';
import Button from '../components/Button';
import Select from '../components/Select';
import Context from '../context/context';
import getPlanets from '../services/api';
import { COLUMN_FILTER, COMPARISON_FILTER } from '../utils/constants';
import Table from '../components/Table';
import Input from '../components/Input';

const Home = () => {
  const { setPlanets, filters, setFilters } = useContext(Context);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  useEffect(() => {
    async function fetchData() {
      const planetsData = await getPlanets();
      setPlanets(planetsData);
    }
    fetchData();
  }, [setPlanets]);

  const handleChangeInput = ({ target: { name, value } }) => {
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = () => {
    const joined = filters.filterBy.concat(state);
    setFilters((prevState) => ({ ...prevState, filterBy: joined }));
  };

  const { column, comparison, value } = state;
  const { filterByName } = filters;

  return (
    <>
      <Input
        name="filterByName"
        type="text"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ handleChangeInput }
      />
      <Select
        label="Column"
        name="column"
        data-testid="column-filter"
        options={ COLUMN_FILTER }
        value={ column }
        onChange={ handleChange }
      />
      <Select
        label="Operator"
        name="comparison"
        data-testid="comparison-filter"
        options={ COMPARISON_FILTER }
        value={ comparison }
        onChange={ handleChange }
      />
      <Input
        name="value"
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ handleChange }
      />
      <Button data-testid="button-filter" onClick={ handleSearch }>Filter</Button>
      <Table />
    </>
  );
};

export default Home;
