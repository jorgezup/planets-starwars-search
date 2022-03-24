import React, { useEffect, useContext, useState } from 'react';
import Button from '../components/Button';
import Select from '../components/Select';
import Context from '../context/context';
import getPlanets from '../services/api';
import { COLUMN_FILTER, COMPARISON_FILTER } from '../utils/constants';
import Table from '../components/Table';
import Input from '../components/Input';
import SortSection from '../components/SortSection';

const Home = () => {
  const { setPlanets, filters, setFilters } = useContext(Context);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [unutilizedFilter, setUnutilizedFilter] = useState(COLUMN_FILTER);

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
    const columnFiltered = unutilizedFilter.filter((item) => item !== state.column);
    setUnutilizedFilter(columnFiltered);
    setState((prevStaste) => ({ ...prevStaste, column: columnFiltered[0] }));
    setFilters((prevState) => ({ ...prevState, filterBy: joined }));
  };

  const handleRemoveFilter = (filterItem) => {
    const joined = unutilizedFilter.concat(filterItem.column);
    const allFilter = filters
      .filterBy.filter((item) => item.column !== filterItem.column);
    setUnutilizedFilter(joined);
    setFilters({ ...filters, filterBy: allFilter });
  };

  const handleRemoveAllFilters = () => {
    setUnutilizedFilter(COLUMN_FILTER);
    setState({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
    setFilters({ filterByName: '', filterBy: [] });
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
        options={ unutilizedFilter }
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
      <Button data-testid="button-filter" onClick={ handleSearch }>
        Filter
      </Button>
      <Button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remove Filters
      </Button>
      <SortSection />
      {filters.filterBy.length > 0 && (
        <section>
          <ul>
            {filters.filterBy.map((filterItem) => (
              <li
                key={ filterItem.column }
                data-testid="filter"
              >
                {`${filterItem.column} ${filterItem.comparison} ${filterItem.value}`}
                <Button
                  onClick={ () => handleRemoveFilter(filterItem) }
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Table />
    </>
  );
};

export default Home;
