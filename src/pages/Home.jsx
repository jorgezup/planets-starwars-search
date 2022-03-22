import React, { useEffect, useContext, Suspense } from 'react';
import Loading from '../components/Loading';
import Context from '../context/context';
import getPlanets from '../services/api';

const Table = React.lazy(() => import('../components/Table'));

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
    <Suspense fallback={ <Loading /> }>
      <Table />
    </Suspense>
  );
};

export default Home;
