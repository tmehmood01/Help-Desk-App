import React, { useState } from 'react';
import axios from 'axios';
import '../TicketForm.css'; // Import CSS file for styling

const TicketForm = ({ onTicketSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tickets', { name, email, description });
      console.log('Ticket submitted:', res.data);
      setName('');
      setEmail('');
      setDescription('');
      if (onTicketSubmit) {
        onTicketSubmit();
      }
    } catch (err) {
      console.error('Error submitting ticket:', err);
    }
  };

  return (
    <div className="ticket-form-container">
      <h2>Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
