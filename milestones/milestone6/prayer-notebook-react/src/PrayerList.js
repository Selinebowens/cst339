import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const PrayerList = ({ answeredOnly }) => {
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const loadPrayers = async () => {
        try {
            setLoading(true);
            const response = answeredOnly
                ? await dataSource.get('/prayers/answered?userId=1')
                : await dataSource.get('/prayers?userId=1');
            setPrayers(response.data);
        } catch (error) {
            console.error('Error loading prayers:', error);
            setErrorMessage('Failed to load prayers. Make sure your API is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrayers();
    }, [answeredOnly]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this prayer?')) {
            try {
                await dataSource.delete(`/prayers/${id}?userId=1`);
                loadPrayers();
            } catch (error) {
                console.error('Error deleting prayer:', error);
                setErrorMessage('Failed to delete prayer.');
            }
        }
    };

    const handleMarkAnswered = async (id) => {
        try {
            await dataSource.put(`/prayers/${id}/answer`, { userId: 1 });
            loadPrayers();
        } catch (error) {
            console.error('Error marking prayer as answered:', error);
            setErrorMessage('Failed to mark prayer as answered.');
        }
    };

    const handleEdit = (id) => {
        navigate(`/prayers/edit/${id}`);
    };

    if (loading) return <div className='container mt-4'><p>Loading prayers...</p></div>;

    return (
        <div className='container mt-4'>
            <h2>{answeredOnly ? 'Answered Prayers' : 'All Prayers'}</h2>

            {errorMessage && (
                <div className='alert alert-danger'>{errorMessage}</div>
            )}

            {prayers.length === 0 ? (
                <div className='alert alert-info'>
                    No prayers found. <a href='/prayers/new'>Add your first prayer!</a>
                </div>
            ) : (
                <table className='table table-bordered table-hover'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prayers.map((prayer) => (
                            <tr key={prayer.id}>
                                <td>{prayer.title}</td>
                                <td>{prayer.description?.substring(0, 60)}...</td>
                                <td>
                                    {prayer.isAnswered
                                        ? <span className='badge bg-success'>Answered</span>
                                        : <span className='badge bg-warning text-dark'>Pending</span>
                                    }
                                </td>
                                <td>{new Date(prayer.dateCreated).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className='btn btn-sm btn-info me-1 text-white'
                                        onClick={() => navigate(`/prayers/${prayer.id}`)}>
                                        View
                                    </button>
                                    <button
                                        className='btn btn-sm btn-warning me-1'
                                        onClick={() => handleEdit(prayer.id)}>
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-sm btn-danger me-1'
                                        onClick={() => handleDelete(prayer.id)}>
                                        Delete
                                    </button>
                                    {!prayer.isAnswered && (
                                        <button
                                            className='btn btn-sm btn-success'
                                            onClick={() => handleMarkAnswered(prayer.id)}>
                                            Mark Answered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PrayerList;