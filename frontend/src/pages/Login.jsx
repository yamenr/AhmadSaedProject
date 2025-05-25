import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage(res.data.message);
      navigate('/manager/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <input name="password" type="password" placeholder="Password"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
        <button type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Login
        </button>
      </form>
      <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
    </div>
  );
}