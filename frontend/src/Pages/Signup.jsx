import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/signup', { name, email, password });
            console.log('Signup successful');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="w-full h-screen text-white bg-custom-green bg-opacity-80">
            <div className="absolute inset-0 -z-10 object-cover w-full h-screen overflow-hidden">
                <img className='h-full w-full object-cover' src="https://upload.wikimedia.org/wikipedia/commons/4/46/Keukenhof-Szmurlo.jpg" alt="Background" />
            </div>
            <div className='absolute inset-0 z-10 object-cover w-full h-screen overflow-hidden flex justify-center items-center'>
                <div className="w-full md:w-5/12 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded text-black"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className='flex justify-center items-center'>
                        <button type="submit" className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Signup</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
