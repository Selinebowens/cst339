import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import PrayerList from './PrayerList';
import PrayerForm from './PrayerForm';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrayerDetails from './PrayerDetails';
import Categories from './Categories';
import SearchResults from './SearchResults';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <BrowserRouter>
            {isLoggedIn && <NavBar onLogout={handleLogout} user={user} />}
            <Routes>
                <Route path='/' element={<Login onLogin={handleLogin} />} />
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/prayers'
                    element={isLoggedIn ? <PrayerList answeredOnly={false} /> : <Navigate to='/login' />}
                />
                <Route
                    path='/prayers/new'
                    element={isLoggedIn ? <PrayerForm /> : <Navigate to='/login' />}
                />
                <Route
                    path='/prayers/edit/:id'
                    element={isLoggedIn ? <PrayerForm /> : <Navigate to='/login' />}
                />
                <Route
                    path='/answered'
                    element={isLoggedIn ? <PrayerList answeredOnly={true} /> : <Navigate to='/login' />}
                />
                <Route
                     path='/prayers/:id'
                     element={isLoggedIn ? <PrayerDetails /> : <Navigate to='/login' />}
                />
                <Route
                        path='/categories'
                        element={isLoggedIn ? <Categories /> : <Navigate to='/login' />}
                />
                <Route
                    path='/search'
                    element={isLoggedIn ? <SearchResults /> : <Navigate to='/login' />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;