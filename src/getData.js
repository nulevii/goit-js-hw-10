import Notifix from 'notiflix';

const getData = link => {
  return fetch(link).then(result => {
    if (!result.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return result.json();
  });
};

export default getData;
