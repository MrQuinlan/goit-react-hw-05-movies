import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getFilms from '../films-api';
import s from './Cast.module.css';

const Cast = () => {
    const [cast, setCast] = useState([]);

    const { filmId } = useParams();

    useEffect(() => {
        getFilms(`movie/${filmId}/credits`).then(res => {
            setCast(res.cast);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className={s.list}>
            {cast.map(actor => {
                const { profile_path, name, character, id } = actor;
                return (
                    <li className={s.item} key={id}>
                        <img
                            className={s.img}
                            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                            alt={name}
                        />
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default Cast;
