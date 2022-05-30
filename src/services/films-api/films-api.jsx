const URL = 'https://api.themoviedb.org/3/';
const KEY = 'b7720d5590e6b7685bc9219f325427a2';

const getFilms = (endPoint, query, page = 1) => {
    if (query === '') {
        return fetch(`${URL}${endPoint}?api_key=${KEY}`).then(res => {
            return res.json();
        });
    }
    return fetch(
        `${URL}${endPoint}?api_key=${KEY}&query=${query}&page=${page}`
    ).then(res => {
        return res.json();
    });
};

export default getFilms;
