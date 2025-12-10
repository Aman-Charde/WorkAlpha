import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import api from '../../config/api';

const ContactResponses = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Mobile Number', 'City', 'Submitted At'];
    const csvData = contacts.map(contact => [
      contact.fullName,
      contact.email,
      contact.mobileNumber,
      contact.city,
      format(new Date(contact.submittedAt), 'dd/MM/yyyy HH:mm')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_responses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  if (loading) {
    return <div className="text-center py-5">Loading contact responses...</div>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contact Form Responses</h2>
        {contacts.length > 0 && (
          <Button variant="success" onClick={exportToCSV}>
            Export to CSV
          </Button>
        )}
      </div>
      
      <div className="mb-3">
        <Badge bg="info" className="p-2 fs-6">
          Total Responses: {contacts.length}
        </Badge>
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h4>No contact responses yet</h4>
          <p>Contact form responses will appear here once users submit the form</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>City</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{index + 1}</td>
                  <td>{contact.fullName}</td>
                  <td>
                    <a href={`mailto:${contact.email}`} className="text-decoration-none">
                      {contact.email}
                    </a>
                  </td>
                  <td>{contact.mobileNumber}</td>
                  <td>{contact.city}</td>
                  <td>
                    {format(new Date(contact.submittedAt), 'dd/MM/yyyy HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ContactResponses;