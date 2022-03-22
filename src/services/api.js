const getPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await response.json();
  delete results.residents;
  return results;
};

export default getPlanets;
