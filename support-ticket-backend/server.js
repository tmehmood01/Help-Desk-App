const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 80;

// Array to store tickets in memory
let tickets = [];

app.use(bodyParser.json());

// Routes
app.post('/api/tickets', (req, res) => {
  const { name, email, description } = req.body;
  const newTicket = {
    id: tickets.length + 1,
    name,
    email,
    description,
    status: 'new', // Set default status to "New"
  };
  tickets.push(newTicket);
  res.status(201).json(newTicket);
});

app.put('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { message, status } = req.body;

  const ticketIndex = tickets.findIndex(ticket => ticket.id == id);

  if (ticketIndex === -1) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    message,
    status,
  };

  res.json(tickets[ticketIndex]);
});

app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
