import React, { useState, useEffect } from 'react';
import dataSource from './dataSource';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3B82F6');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editColor, setEditColor] = useState('');

    const loadCategories = async () => {
        try {
            setLoading(true);
            const response = await dataSource.get('/categories?userId=1');
            setCategories(response.data);
        } catch (error) {
            console.error('Error loading categories:', error);
            setErrorMessage('Failed to load categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleAdd = async (event) => {
        event.preventDefault();
        try {
            await dataSource.post('/categories?userId=1', { name, color, userId: 1 });
            setName('');
            setColor('#3B82F6');
            loadCategories();
        } catch (error) {
            console.error('Error adding category:', error);
            setErrorMessage('Failed to add category.');
        }
    };

    const handleEdit = (category) => {
        setEditingId(category.id);
        setEditName(category.name);
        setEditColor(category.color);
    };

    const handleUpdate = async (id) => {
        try {
            await dataSource.put(`/categories/${id}?userId=1`, {
                name: editName,
                color: editColor,
                userId: 1
            });
            setEditingId(null);
            loadCategories();
        } catch (error) {
            console.error('Error updating category:', error);
            setErrorMessage('Failed to update category.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await dataSource.delete(`/categories/${id}?userId=1`);
                loadCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                setErrorMessage('Failed to delete category.');
            }
        }
    };

    if (loading) return <div className='container mt-4'><p>Loading categories...</p></div>;

    return (
        <div className='container mt-4'>
            <h2>Prayer Categories</h2>

            {errorMessage && (
                <div className='alert alert-danger'>{errorMessage}</div>
            )}

            {/* Add New Category Form */}
            <div className='card mb-4 shadow-sm'>
                <div className='card-header fw-bold' style={{ backgroundColor: '#1A2B4A', color: 'white' }}>
                    Add New Category
                </div>
                <div className='card-body'>
                    <form onSubmit={handleAdd} className='row g-3 align-items-end'>
                        <div className='col-md-6'>
                            <label className='form-label fw-bold'>Category Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter category name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-md-3'>
                            <label className='form-label fw-bold'>Color</label>
                            <input
                                type='color'
                                className='form-control form-control-color w-100'
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        <div className='col-md-3'>
                            <button type='submit' className='btn btn-primary w-100'>
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Categories List */}
            {categories.length === 0 ? (
                <div className='alert alert-info'>No categories found. Add your first category above!</div>
            ) : (
                <table className='table table-bordered table-hover'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Color</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            backgroundColor: category.color
                                        }}>
                                    </span>
                                </td>
                                <td>
                                    {editingId === category.id ? (
                                        <div className='d-flex gap-2'>
                                            <input
                                                type='text'
                                                className='form-control form-control-sm'
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                            <input
                                                type='color'
                                                className='form-control form-control-color'
                                                value={editColor}
                                                onChange={(e) => setEditColor(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td>
                                    {editingId === category.id ? (
                                        <div className='d-flex gap-2'>
                                            <button
                                                className='btn btn-sm btn-success'
                                                onClick={() => handleUpdate(category.id)}>
                                                Save
                                            </button>
                                            <button
                                                className='btn btn-sm btn-secondary'
                                                onClick={() => setEditingId(null)}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='d-flex gap-2'>
                                            <button
                                                className='btn btn-sm btn-warning'
                                                onClick={() => handleEdit(category)}>
                                                Edit
                                            </button>
                                            <button
                                                className='btn btn-sm btn-danger'
                                                onClick={() => handleDelete(category.id)}>
                                                Delete
                                            </button>
                                        </div>
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

export default Categories;