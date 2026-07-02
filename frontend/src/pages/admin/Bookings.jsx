import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import api from '../../api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 60, capacity2: 20, capacity3: 20, capacity4: 20 });
  const [dateFilter, setDateFilter] = useState('');

  const fetchData = async () => {
    try {
      const resStats = await api.get('/tables/stats');
      setStats(resStats.data);

      const resBookings = await api.get('/reservations');
      setBookings(resBookings.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.put(`/reservations/${id}/cancel`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const bookedReservations = bookings.filter(b => b.status === 'Booked' && (dateFilter ? b.date === dateFilter : true));
  const activeBookingsOverall = bookings.filter(b => b.status === 'Booked');

  const countBooked = (capacity) => {
    return activeBookingsOverall.filter(b => b.table?.capacity === capacity).length;
  };

  const b2 = countBooked(2);
  const b3 = countBooked(3);
  const b4 = countBooked(4);

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Bookings</h2>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-blue)' }}>
          Tables Remaining → {stats.total - activeBookingsOverall.length}
        </div>
      </div>
      
      <Card style={{ marginTop: '1rem' }}>
        <div className="stats-grid">
          <div className="stat-box">
            <h4>2 Seater</h4>
            <p>Booked : {b2}</p>
            <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Remaining : {stats.capacity2 - b2}</p>
          </div>
          <div className="stat-box">
            <h4>3 Seater</h4>
            <p>Booked : {b3}</p>
            <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Remaining : {stats.capacity3 - b3}</p>
          </div>
          <div className="stat-box">
            <h4>4 Seater</h4>
            <p>Booked : {b4}</p>
            <p style={{ color: 'var(--color-grey)', fontSize: '0.9rem' }}>Remaining : {stats.capacity4 - b4}</p>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem', fontWeight: 'bold' }}>Filter by Date:</label>
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button onClick={() => setDateFilter('')} className="btn btn-outline" style={{ marginLeft: '1rem' }}>Clear</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {bookedReservations.map(b => (
            <Card key={b._id} style={{ border: '1px solid var(--color-blue)', marginBottom: 0 }}>
              <p><strong>Table Number:</strong> {b.table?.tableNumber}</p>
              <p><strong>Customer:</strong> {b.user?.username}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.timeSlot}</p>
              <p><strong>Guests:</strong> {b.guests}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button className="btn btn-danger" onClick={() => handleCancel(b._id)}>Cancel</button>
                <button className="btn btn-outline" onClick={() => alert('Update functionality placeholder (requires modal/form)')}>Update</button>
              </div>
            </Card>
          ))}
          {bookedReservations.length === 0 && <p>No booked tables found.</p>}
        </div>
      </Card>
    </Layout>
  );
};

export default Bookings;
