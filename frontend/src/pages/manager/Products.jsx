import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '' });
  const token = localStorage.getItem('token');

  const fetchProducts = () => {
    axios.get('http://localhost:3001/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/products', {
      ...newProduct,
      description: '',
      price: 0,
      image: ''
    }, {
      headers: { Authorization: 'Bearer ' + token }
    })
    .then(() => {
      setShowAddForm(false);
      setNewProduct({ name: '', stock: '' });
      fetchProducts();
    })
    .catch(() => alert('Error adding product'));
  };

  const handleEdit = (product) => {
    const newName = prompt('Enter new name', product.name);
    const newStock = prompt('Enter new stock', product.stock);
    if (newName && newStock) {
      axios.put(`http://localhost:3001/api/products/${product.product_id}`, {
        name: newName,
        stock: parseInt(newStock)
      }, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(fetchProducts)
      .catch(() => alert('Error updating product'));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:3001/api/products/${id}`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(fetchProducts)
      .catch(() => alert('Error deleting product'));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Products</h2>
      
      <button
        onClick={() => setShowAddForm(true)}
        style={{ background: 'green', color: 'white', padding: '10px', marginBottom: '20px' }}
      >
        Add New Product
      </button>

      {showAddForm && (
        <form onSubmit={handleAddProduct} style={{
          border: '1px solid #ccc',
          padding: '15px',
          maxWidth: '400px',
          background: '#f9f9f9',
          marginBottom: '20px'
        }}>
          <h4>Add Product</h4>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
            style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
          />
          <button type="submit" style={{ background: 'blue', color: 'white', padding: '8px 16px' }}>
            Save
          </button>
          <button type="button" onClick={() => setShowAddForm(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      )}

      <ul>
        {products.map((p) => (
          <li key={p.product_id} style={{ marginBottom: '10px' }}>
            {p.name} – Stock: {p.stock}
            <button onClick={() => handleEdit(p)} style={{ marginLeft: '10px' }}>Edit</button>
            <button
              onClick={() => handleDelete(p.product_id)}
              style={{ marginLeft: '5px', background: 'red', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
