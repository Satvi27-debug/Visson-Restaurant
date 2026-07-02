import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (id) => {
    try {
      await api.put(`/complaints/${id}/resolve`);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await api.delete(`/complaints/${id}`);
        fetchComplaints();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Layout>
      <h2>Complaints</h2>
      <Card style={{ marginTop: '1rem' }}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Subject</th>
              <th>Complaint</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c._id}>
                <td>{c.user?.username}</td>
                <td>{c.subject}</td>
                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.text}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: c.status === 'Pending' ? '#ffc107' : '#28a745',
                    color: c.status === 'Pending' ? '#000' : '#fff',
                    fontSize: '0.9rem'
                  }}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {c.status === 'Pending' && (
                      <button className="btn btn-success" onClick={() => handleResolve(c._id)} style={{ padding: '0.5rem' }}>Resolve</button>
                    )}
                    <button className="btn btn-danger" onClick={() => handleDelete(c._id)} style={{ padding: '0.5rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Layout>
  );
};

export default AdminComplaints;
