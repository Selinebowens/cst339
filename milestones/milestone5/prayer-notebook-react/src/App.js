import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import PrayerList from './PrayerList';
import PrayerForm from './PrayerForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Navigate to='/prayers' />} />
                <Route path='/prayers' element={<PrayerList answeredOnly={false} />} />
                <Route path='/prayers/new' element={<PrayerForm />} />
                <Route path='/prayers/edit/:id' element={<PrayerForm />} />
                <Route path='/answered' element={<PrayerList answeredOnly={true} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;