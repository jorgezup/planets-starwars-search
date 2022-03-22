import React, { useEffect, useContext } from 'react';
import Table from '../components/Table';
import Context from '../context/context';
import getPlanets from '../services/api';

const Home = () => {
  const { setPlanets } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      const planets = await getPlanets();
      setPlanets(planets);
    }
    fetchData();
  }, [setPlanets]);
  return (
    <Table />
  );
};

export default Home;
