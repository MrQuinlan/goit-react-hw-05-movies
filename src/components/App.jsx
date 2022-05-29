import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Container from './Container';
import NavBar from './NavBar';

import getFilms from './films-api';
import HomePage from './HomePage';
import SearchBar from './SearchBar';
import MoviesPage from './MoviesPage';
import FilmPage from './FilmPage';
import Cast from './Cast';
import Reviews from './Reviews';
import Loader from './Loader';

export const App = () => {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('idle');
    const [films, setFilms] = useState([]);
    const [historyLocation, setHistoryLocation] = useState('');

    useEffect(() => {
        if (!query) {
            return;
        }

        getFilms('search/movie', query).then(res => {
            setFilms(res.results);
            setStatus('resolved');
        });
    }, [query]);

    function onSetHistory(val) {
        setHistoryLocation(val);
    }

    function onSubmit(val) {
        if (val === '') {
            return;
        }

        if (query === val) {
            return;
        }

        setQuery(val);
        setStatus('pending');
    }

    return (
        <Container>
            <NavBar />

            <Routes>
                <Route
                    exact
                    path="/"
                    element={<HomePage onSetHistory={onSetHistory} />}
                />
                <Route
                    path="/Movies"
                    element={<SearchBar onSubmit={onSubmit} />}
                >
                    <Route
                        path="q=:searchQuery"
                        element={
                            <MoviesPage
                                onSetHistory={onSetHistory}
                                films={films}
                            />
                        }
                    />
                </Route>

                {/* {status === 'resolved' && <MoviesPage films={films} />} */}

                <Route
                    path="/Movies/:filmId"
                    element={<FilmPage historyLocation={historyLocation} />}
                >
                    <Route path="/Movies/:filmId/cast" element={<Cast />} />
                    <Route
                        path="/Movies/:filmId/review"
                        element={<Reviews />}
                    />
                </Route>
            </Routes>

            {status === 'pending' && <Loader />}
        </Container>
    );
};
