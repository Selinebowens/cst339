import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const PrayerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prayer, setPrayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadPrayer = async () => {
            try {
                const response = await dataSource.get(`/prayers/${id}?userId=1`);
                setPrayer(response.data);
            } catch (error) {
                console.error('Error loading prayer:', error);
                setErrorMessage('Failed to load prayer details.');
            } finally {
                setLoading(false);
            }
        };
        loadPrayer();
    }, [id]);

    const handleEdit = () => {
        navigate(`/prayers/edit/${id}`);
    };

    const handleBack = () => {
        navigate('/prayers');
    };

    if (loading) return <div className='container mt-4'><p>Loading prayer details...</p></div>;

    if (errorMessage) return (
        <div className='container mt-4'>
            <div className='alert alert-danger'>{errorMessage}</div>
            <button className='btn btn-secondary' onClick={handleBack}>Back to Prayers</button>
        </div>
    );

    return (
        <div className='container mt-4' style={{ maxWidth: '700px' }}>
            <button className='btn btn-outline-secondary mb-3' onClick={handleBack}>
                ← Back to Prayers
            </button>

            <div className='card shadow'>
                <div className='card-header d-flex justify-content-between align-items-center'
                    style={{ backgroundColor: '#1A2B4A', color: 'white' }}>
                    <h4 className='mb-0'>{prayer.title}</h4>
                    <span className={`badge ${prayer.isAnswered ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {prayer.isAnswered ? 'Answered' : 'Pending'}
                    </span>
                </div>

                <div className='card-body'>
                    <div className='mb-4'>
                        <h6 className='fw-bold text-muted'>Description</h6>
                        <p>{prayer.description}</p>
                    </div>

                    {prayer.notes && (
                        <div className='mb-4'>
                            <h6 className='fw-bold text-muted'>Notes</h6>
                            <p>{prayer.notes}</p>
                        </div>
                    )}

                    <div className='row mb-4'>
                        <div className='col-md-6'>
                            <h6 className='fw-bold text-muted'>Date Created</h6>
                            <p>{new Date(prayer.dateCreated).toLocaleDateString()}</p>
                        </div>
                        {prayer.isAnswered && prayer.dateAnswered && (
                            <div className='col-md-6'>
                                <h6 className='fw-bold text-muted'>Date Answered</h6>
                                <p>{new Date(prayer.dateAnswered).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    <div className='d-flex gap-2'>
                        <button className='btn btn-warning' onClick={handleEdit}>
                            Edit Prayer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrayerDetails;