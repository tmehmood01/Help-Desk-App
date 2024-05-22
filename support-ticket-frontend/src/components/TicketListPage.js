import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TicketListPage.css'; // Import CSS file for styling

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/api/tickets');
      console.log("data", res.data);
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const handleRespondClick = (ticket) => {
    console.log("ticket", ticket);
    setSelectedTicket(ticket);
    setMessage('');
    setNewStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("selectedTicket", selectedTicket);
      await axios.put(`/api/tickets/${selectedTicket.id}`, {
        message,
        status: newStatus,
      });
      fetchTickets();
      // Reset form fields and selected ticket after submission
      setMessage('');
      setNewStatus('');
      setSelectedTicket(null);
    } catch (err) {
      console.error('Error updating ticket:', err);
    }
  };

  return (
    <div>
      <h2>List of Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <p>Name: {ticket.name}</p>
            <p>Email: {ticket.email}</p>
            <p>Description: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <button onClick={() => handleRespondClick(ticket)}>Respond</button>
            <hr />
          </li>
        ))}
      </ul>
      {selectedTicket && (
        <div>
          <h2>Respond to Ticket</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Message:</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <div>
              <label>Status:</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="new">New</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TicketListPage;
