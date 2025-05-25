import React, { useState } from 'react';
import axios from 'axios';

function AddProductForm({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3001/api/products', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ backgroundColor: '#fff', padding: 30, borderRadius: 8, width: '400px' }}>
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit}>
          {['name', 'description', 'price', 'stock', 'image'].map(key => (
            <div key={key} style={{ marginBottom: 10 }}>
              <input
                name={key}
                placeholder={key}
                value={form[key]}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          ))}
          <div style={{ textAlign: 'right' }}>
            <button type="submit" style={{ marginRight: '10px' }}>Save</button>
            <button onClick={onClose} type="button">Cancel</button>
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default AddProductForm;