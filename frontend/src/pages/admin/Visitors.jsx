import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState('');

  const fetchVisitors = async () => {
    try {
      const res = await api.get('/users/visitors');
      setVisitors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This will delete the user and all their reservations and complaints.')) {
      try {
        await api.delete(`/users/visitors/${id}`);
        fetchVisitors();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredVisitors = visitors.filter(v => v.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <h2>Visitors</h2>
      <Card style={{ marginTop: '1rem' }}>
        <input 
          type="text" 
          placeholder="Search by Username..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map(v => (
              <tr key={v._id}>
                <td>{v.username}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(v._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredVisitors.length === 0 && (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>No visitors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
};

export default Visitors;
