import { Link, useParams } from 'react-router-dom';
import s from './AdditionalInfo.module.css';

const AdditionalInfo = () => {
    const { filmId } = useParams();

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Additional information</h2>
            <ul>
                <li className={s.item}>
                    <Link to={`/movies/${filmId}/cast`}>cast</Link>
                </li>
                <li className={s.item}>
                    <Link to={`/movies/${filmId}/review`}>reviews</Link>
                </li>
            </ul>
        </div>
    );
};

export default AdditionalInfo;
