import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import s from './MoviesPage.module.css';

const MoviesPage = ({ films, onSetHistory }) => {
    const historyLocation = createBrowserHistory().location.pathname;

    useEffect(() => {
        onSetHistory(historyLocation);
    }, []);

    return (
        <ul>
            {films.map(film => {
                const { id, title } = film;

                return (
                    <li className={s.item} key={id}>
                        <Link to={`/Movies/${id}`}>{title}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default MoviesPage;
