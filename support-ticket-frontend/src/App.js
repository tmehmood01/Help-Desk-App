import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TicketForm from './components/TicketForm';
import TicketListPage from './components/TicketListPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Support Ticket Management System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/ticket">Submit Ticket</Link>
            </li>
            <li>
              <Link to="/tickets">List of Tickets</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/ticket" element={<TicketForm />} />
          <Route path="/tickets" element={<TicketListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
