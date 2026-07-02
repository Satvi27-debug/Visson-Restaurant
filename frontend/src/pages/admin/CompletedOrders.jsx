import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const CompletedOrders = () => {
  const [completedBookings, setCompletedBookings] = useState([]);

  const fetchData = async () => {
    try {
      const resBookings = await api.get('/reservations');
      setCompletedBookings(resBookings.data.filter(b => b.status === 'Completed'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to permanently delete all completed orders?")) {
      try {
        await api.delete('/reservations/completed');
        setCompletedBookings([]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Completed Orders</h2>
        <button 
          onClick={handleClearAll} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--color-danger, red)'
          }}
          title="Clear all completed orders"
        >
          🗑️
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {completedBookings.map(b => (
          <Card key={b._id} style={{ border: '1px solid var(--color-grey)', marginBottom: 0 }}>
            <p><strong>Table Number:</strong> {b.table?.tableNumber}</p>
            <p><strong>Customer:</strong> {b.user?.username}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Guests:</strong> {b.guests}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </Card>
        ))}
        {completedBookings.length === 0 && <p>No completed orders found.</p>}
      </div>
    </Layout>
  );
};

export default CompletedOrders;
