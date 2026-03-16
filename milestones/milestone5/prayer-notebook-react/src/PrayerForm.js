import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dataSource from './dataSource';

const PrayerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isEditMode) {
            const loadPrayer = async () => {
                try {
                    setLoading(true);
                    const response = await dataSource.get(`/prayers/${id}?userId=1`);
                    const prayer = response.data;
                    setTitle(prayer.title);
                    setDescription(prayer.description);
                    setNotes(prayer.notes || '');
                    setCategoryId(prayer.categoryId);
                } catch (error) {
                    console.error('Error loading prayer:', error);
                    setErrorMessage('Failed to load prayer.');
                } finally {
                    setLoading(false);
                }
            };
            loadPrayer();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const prayer = {
            title,
            description,
            notes,
            categoryId,
            userId: 1,
        };

        try {
            if (isEditMode) {
                await dataSource.put(`/prayers/${id}?userId=1`, prayer);
            } else {
                await dataSource.post('/prayers?userId=1', prayer);
            }
            navigate('/prayers');
        } catch (error) {
            console.error('Error saving prayer:', error);
            setErrorMessage('Failed to save prayer. Make sure your API is running.');
        }
    };

    const handleCancel = () => {
        navigate('/prayers');
    };

    if (loading) return <div className='container mt-4'><p>Loading...</p></div>;

    return (
        <div className='container mt-4'>
            <h2>{isEditMode ? 'Edit Prayer' : 'Add New Prayer'}</h2>

            {errorMessage && (
                <div className='alert alert-danger'>{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>Title</label>
                    <input
                        type='text'
                        className='form-control'
                        id='title'
                        placeholder='Enter prayer title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea
                        className='form-control'
                        id='description'
                        rows='4'
                        placeholder='Describe your prayer request'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='notes' className='form-label'>Notes (optional)</label>
                    <textarea
                        className='form-control'
                        id='notes'
                        rows='2'
                        placeholder='Any additional notes'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='categoryId' className='form-label'>Category</label>
                    <select
                        className='form-select'
                        id='categoryId'
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}>
                        <option value={1}>Family</option>
                        <option value={2}>Work</option>
                        <option value={3}>Health</option>
                        <option value={4}>Personal</option>
                        <option value={5}>Community</option>
                    </select>
                </div>
                <div className='text-center'>
                    <button type='button' className='btn btn-light me-2' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='btn btn-primary'>
                        {isEditMode ? 'Update Prayer' : 'Save Prayer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PrayerForm;