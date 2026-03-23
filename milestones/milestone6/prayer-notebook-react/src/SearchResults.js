import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from './dataSource';

const SearchResults = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setErrorMessage('');
        setSearched(false);

        try {
            const response = await dataSource.get(`/prayers/search?userId=1&q=${query}`);
            setResults(response.data);
            setSearched(true);
        } catch (error) {
            console.error('Error searching prayers:', error);
            setErrorMessage('Failed to search prayers. Make sure your API is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this prayer?')) {
            try {
                await dataSource.delete(`/prayers/${id}?userId=1`);
                setResults(results.filter((p) => p.id !== id));
            } catch (error) {
                console.error('Error deleting prayer:', error);
                setErrorMessage('Failed to delete prayer.');
            }
        }
    };

    return (
        <div className='container mt-4'>
            <h2>Search Prayers</h2>

            {/* Search Form */}
            <div className='card mb-4 shadow-sm'>
                <div className='card-body'>
                    <form onSubmit={handleSearch} className='row g-3 align-items-end'>
                        <div className='col-md-9'>
                            <label className='form-label fw-bold'>Search by keyword</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Type a keyword to search...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-md-3'>
                            <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {errorMessage && (
                <div className='alert alert-danger'>{errorMessage}</div>
            )}

            {/* Results */}
            {searched && results.length === 0 && (
                <div className='alert alert-info'>
                    No prayers found for <strong>"{query}"</strong>. Try a different keyword.
                </div>
            )}

            {searched && results.length > 0 && (
                <>
                    <p className='text-muted'>Found <strong>{results.length}</strong> prayer(s) for "<strong>{query}</strong>"</p>
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
                            {results.map((prayer) => (
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
                                            onClick={() => navigate(`/prayers/edit/${prayer.id}`)}>
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-sm btn-danger'
                                            onClick={() => handleDelete(prayer.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default SearchResults;