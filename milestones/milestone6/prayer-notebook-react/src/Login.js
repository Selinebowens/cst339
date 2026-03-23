import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import dataSource from './dataSource';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await dataSource.post('/auth/login', { email, password });
            onLogin(response.data.user);
            navigate('/prayers');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
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
                        <p className='text-muted'>Sign in to your account</p>
                    </div>

                    {error && (
                        <div className='alert alert-danger'>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary w-100 mt-2' disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className='text-center mt-3'>
                        <p className='text-muted'>Don't have an account? <Link to='/register'>Register here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;