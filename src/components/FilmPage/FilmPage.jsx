import { Link, useParams, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getFilms from '../films-api';
import AdditionalInfo from '../AdditionalInfo';
import s from './FilmPage.module.css';

const FilmPage = ({ historyLocation }) => {
    const [film, setFilm] = useState({});
    const [poster, setPoster] = useState([]);
    const [genres, setGenres] = useState([]);
    const [date, setDate] = useState('');

    const { filmId } = useParams();

    useEffect(() => {
        getFilms(`movie/${filmId}`).then(res => {
            setFilm(res);
            setPoster(`https://image.tmdb.org/t/p/w300/${res.poster_path}`);
            setGenres(res.genres);
            setDate(res.release_date.slice(0, 4));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { title, overview, vote_average } = film;

    return (
        <>
            <button className={s.btn} type="button">
                <Link className={s.goBack} to={historyLocation}>
                    &#129144; Go back
                </Link>
            </button>

            <div className={s.filmInfo}>
                <img src={poster} alt={title} />
                <ul className={s.list}>
                    <li>
                        <h1>
                            {title}({date})
                        </h1>
                    </li>

                    <li>Rating: {vote_average}</li>

                    <li>
                        <h2 className={s.title}>Overview</h2>
                        {overview}
                    </li>

                    <li>
                        <h2 className={s.title}>Genres</h2>
                        <ul className={s.genresList}>
                            {genres.map(genre => {
                                return (
                                    <li className={s.genresItem} key={genre.id}>
                                        {genre.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
            <AdditionalInfo />
            <Outlet />
        </>
    );
};

export default FilmPage;
