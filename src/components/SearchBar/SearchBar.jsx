import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const query = e.target.value.toLowerCase();

        setQuery(query);
    };

    const handleSubmit = e => {
        e.preventDefault();

        navigate(`/Movies/q=${query.trim()}`);

        onSubmit(query.trim());

        reset();
    };

    const reset = () => {
        setQuery('');
    };

    return (
        <>
            <form className={s.form} onSubmit={handleSubmit}>
                <input
                    className={s.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movie"
                    value={query}
                    onChange={handleChange}
                />

                <button type="submit" className={s.button}>
                    Search
                </button>
            </form>
            <Outlet />
        </>
    );
};

export default SearchBar;
