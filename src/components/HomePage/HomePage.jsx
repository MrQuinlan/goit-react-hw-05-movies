import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom';
import getFilms from '../../services/films-api';
import s from './HomePage.module.css';

const HomePage = ({ onSetHistory }) => {
    const [films, setFilms] = useState([]);

    const historyLocation = createBrowserHistory().location.pathname;

    useEffect(() => {
        getFilms('trending/movie/day', 1).then(res => {
            setFilms(res.results);
            onSetHistory(historyLocation);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1 className={s.title}>Trending today</h1>
            <ul>
                {films.map(film => {
                    const { id, title } = film;

                    return (
                        <li className={s.item} key={id}>
                            <Link to={`/movies/${id}`}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default HomePage;
