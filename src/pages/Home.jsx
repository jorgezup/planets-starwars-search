import React, { useEffect, useContext, Suspense, useState } from 'react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Select from '../components/Select';
import Context from '../context/context';
import getPlanets from '../services/api';
import { COLUMN_FILTER, COMPARISON_FILTER } from '../utils/constants';

const Table = React.lazy(() => import('../components/Table'));
const Input = React.lazy(() => import('../components/Input'));

const Home = () => {
  const { setPlanets, setFilters } = useContext(Context);
  const [state, setState] = useState({
    nameFilter: '',
    columnFilter: '',
    comparisonFilter: '',
    valueFilter: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const planets = await getPlanets();
      setPlanets(planets);
    }
    fetchData();
  }, [setPlanets]);

  const handleChange = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setFilters((prevState) => ({ ...prevState, state }));
  }, [setFilters, state]);

  const { nameFilter, columnFilter, comparisonFilter, valueFilter } = state;

  return (
    <Suspense fallback={ <Loading /> }>
      <Input
        // label="Filter"
        name="nameFilter"
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ handleChange }
      />
      <Select
        label="Column"
        name="columnFilter"
        data-testid="column-filter"
        options={ COLUMN_FILTER }
        value={ columnFilter }
        onChange={ handleChange }
      />
      <Select
        label="Operator"
        name="comparisonFilter"
        data-testid="comparison-filter"
        options={ COMPARISON_FILTER }
        value={ comparisonFilter }
        onChange={ handleChange }
      />
      <Input
        // label="Value"
        name="valueFilter"
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ handleChange }
      />
      <Button>Search</Button>
      <Table />
    </Suspense>
  );
};

export default Home;
