import React, { useEffect, useContext, Suspense, useState } from 'react';
import Loading from '../components/Loading';
import Context from '../context/context';
import getPlanets from '../services/api';

const Table = React.lazy(() => import('../components/Table'));
const Input = React.lazy(() => import('../components/Input'));

const Home = () => {
  const { setPlanets, setFilters } = useContext(Context);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const planets = await getPlanets();
      setPlanets(planets);
    }
    fetchData();
  }, [setPlanets]);

  const handleChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  useEffect(() => {
    setFilters((prevState) => ({ ...prevState, filterByName }));
  }, [filterByName, setFilters]);

  return (
    <Suspense fallback={ <Loading /> }>
      <Input
        label="filtrar"
        name="Filtrar"
        type="text"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ handleChange }
      />
      <Table />
    </Suspense>
  );
};

export default Home;
