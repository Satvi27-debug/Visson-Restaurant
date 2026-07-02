import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const TablesAvailable = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(1);
  const [availability, setAvailability] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const checkAvailability = async () => {
    if (!date || !timeSlot) return;
    try {
      const res = await api.get(`/reservations/availability?date=${date}&timeSlot=${timeSlot}`);
      setAvailability(res.data);
      setMessage('');
      setError('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [date, timeSlot]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations', { date, timeSlot, guests });
      setMessage('Table booked successfully!');
      setError('');
      checkAvailability();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book table');
      setMessage('');
    }
  };

  return (
    <Layout>
      <h2>Tables Available</h2>
      <Card style={{ marginTop: '1rem' }}>
        <form onSubmit={handleBooking} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
            <label>Reservation Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="form-group" style={{ flex: '1', minWidth: '150px' }}>
            <label>Time Slot</label>
            <input type="time" value={timeSlot} onChange={e => setTimeSlot(e.target.value)} required />
          </div>
          <div className="form-group" style={{ flex: '1', minWidth: '100px' }}>
            <label>Guests (1-4)</label>
            <input type="number" min="1" max="4" value={guests} onChange={e => setGuests(Number(e.target.value))} required />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <button type="submit" className="btn">Book Now</button>
          </div>
        </form>

        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        {availability ? (
          <div className="stats-grid">
            <div className="stat-box">
              <h4>2 Seater</h4>
              <p>Available: {availability[2].available}</p>
              <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Booked: {availability[2].booked}</p>
            </div>
            <div className="stat-box">
              <h4>3 Seater</h4>
              <p>Available: {availability[3].available}</p>
              <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Booked: {availability[3].booked}</p>
            </div>
            <div className="stat-box">
              <h4>4 Seater</h4>
              <p>Available: {availability[4].available}</p>
              <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Booked: {availability[4].booked}</p>
            </div>
          </div>
        ) : (
          <p>Please select a date and time slot to view availability.</p>
        )}
      </Card>
    </Layout>
  );
};

export default TablesAvailable;
