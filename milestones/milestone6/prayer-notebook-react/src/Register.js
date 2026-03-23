import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dataSource from './dataSource';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        // Check passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Check password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            await dataSource.post('/auth/register', { name, email, password });
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container' style={{ maxWidth: '450px', marginTop: '80px' }}>
            <div className='card shadow'>
                <div className='card-body p-4'>
                    <div className='text-center mb-4'>
                        <h2 className='fw-bold' style={{ color: '#1A2B4A' }}>🙏 Prayer Notebook</h2>
                        <p className='text-muted'>Create a new account</p>
                    </div>

                    {error && (
                        <div className='alert alert-danger'>{error}</div>
                    )}

                    {success && (
                        <div className='alert alert-success'>{success}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label fw-bold'>Full Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder='Enter your full name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label fw-bold'>Email Address</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label fw-bold'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='At least 6 characters'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='confirmPassword' className='form-label fw-bold'>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                placeholder='Repeat your password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary w-100 mt-2' disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className='text-center mt-3'>
                        <p className='text-muted'>Already have an account? <Link to='/login'>Sign in here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;