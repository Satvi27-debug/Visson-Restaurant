import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await api.get('/reservations/my-reservations');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to withdraw this reservation?')) {
      try {
        await api.put(`/reservations/${id}/cancel`);
        fetchBookings();
      } catch (err) {
        alert('Failed to cancel reservation');
        console.error(err);
      }
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'Booked');

  return (
    <Layout>
      <h2>My Bookings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="cards-grid" style={{ marginTop: '1.5rem' }}>
        {activeBookings.map(b => (
          <Card key={b._id} className="full-width-card" style={{ borderLeft: '4px solid var(--color-blue)' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-grey)' }}>Table {b.table?.tableNumber}</h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Date:</strong> {b.date}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Time:</strong> {b.timeSlot}</p>
            <p style={{ marginBottom: '1.5rem' }}><strong>Capacity:</strong> {b.table?.capacity} Seater ({b.guests} Guests)</p>
            <button className="btn btn-danger" style={{ width: '100%' }} onClick={() => handleCancel(b._id)}>
              Withdraw Reservation
            </button>
          </Card>
        ))}
        {activeBookings.length === 0 && (
          <Card className="full-width-card">
            <p style={{ textAlign: 'center' }}>You currently have no active bookings.</p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyBookings;
