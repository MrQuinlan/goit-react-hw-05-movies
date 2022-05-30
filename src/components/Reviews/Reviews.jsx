import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getFilms from '../../services/films-api';
import s from './Reviews.module.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    const { filmId } = useParams();

    useEffect(() => {
        getFilms(`movie/${filmId}/reviews`).then(res => {
            setReviews(res.results);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul className={s.list}>
            {reviews.map(review => {
                const { author, content, id } = review;
                return (
                    <li className={s.item} key={id}>
                        <h2>Author: {author}</h2>
                        <p>{content}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default Reviews;
