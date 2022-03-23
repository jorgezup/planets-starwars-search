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
  const { setPlanets, filters, setFilters } = useContext(Context);
  const [state, setState] = useState({
    column: 'maior que',
    comparison: 'population',
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
    setFilters((prevState) => ({ ...prevState, filterBy: { ...state } }));
  };

  const { column, comparison, value } = state;
  const { nameFilter } = filters;

  // useEffect(() => {
  //   setFilters((prevState) => ({ ...prevState, filters }));
  // }, [filters, setFilters]);

  return (
    <Suspense fallback={ <Loading /> }>
      <Input
        // label="Filter"
        name="nameFilter"
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
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
        // label="Value"
        name="value"
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ handleChange }
      />
      <Button data-testid="button-filter" onClick={ handleSearch }>Filter</Button>
      <Table />
    </Suspense>
  );
};

export default Home;
