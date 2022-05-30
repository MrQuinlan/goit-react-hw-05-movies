import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getFilms from '../../services/films-api';
import s from './Cast.module.css';
import NoImageFound from '../../img/No-image-found.jpg';

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
                const photo = `https://image.tmdb.org/t/p/original/${profile_path}`;

                return profile_path ? (
                    <li className={s.item} key={id}>
                        <img className={s.img} src={photo} alt={name} />
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                ) : (
                    <li className={s.item} key={id}>
                        <img className={s.img} src={NoImageFound} alt={name} />
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                );

                // return (
                //     <li className={s.item} key={id}>
                //         <img className={s.img} src={photo} alt={name} />
                //         <p>{name}</p>
                //         <p>Character: {character}</p>
                //     </li>
                // );
            })}
        </ul>
    );
};

export default Cast;
