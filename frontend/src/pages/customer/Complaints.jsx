import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const CustomerComplaints = () => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/complaints', { subject, text });
      setMessage('Complaint submitted successfully!');
      setSubject('');
      setText('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  return (
    <Layout>
      <h2>Submit a Complaint</h2>
      <Card style={{ maxWidth: '600px', marginTop: '1rem' }}>
        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Complaint</label>
            <textarea 
              rows="5"
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </Card>
    </Layout>
  );
};

export default CustomerComplaints;
