import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import api from '../../config/api';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get('/api/subscriptions');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (window.confirm(`Are you sure you want to remove subscription for ${email}?`)) {
      try {
        await api.delete(`/api/subscriptions/${id}`);
        toast.success('Subscription removed successfully!');
        fetchSubscriptions();
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error removing subscription';
        toast.error(errorMsg);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Subscribed At'];
    const csvData = subscriptions.map(sub => [
      sub.email,
      format(new Date(sub.subscribedAt), 'dd/MM/yyyy HH:mm')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  if (loading) {
    return <div className="text-center py-5">Loading subscriptions...</div>;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Newsletter Subscriptions</h2>
        {subscriptions.length > 0 && (
          <Button variant="success" onClick={exportToCSV}>
            Export to CSV
          </Button>
        )}
      </div>

      <div className="mb-3">
        <Badge bg="success" className="p-2 fs-6">
          Total Subscribers: {subscriptions.length}
        </Badge>
      </div>

      {subscriptions.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No newsletter subscriptions yet</Alert.Heading>
          <p>
            Subscribers will appear here once users subscribe through the newsletter form on the landing page.
          </p>
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Subscribed At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription, index) => (
                <tr key={subscription._id}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={`mailto:${subscription.email}`} className="text-decoration-none">
                      {subscription.email}
                    </a>
                  </td>
                  <td>
                    {format(new Date(subscription.subscribedAt), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(subscription._id, subscription.email)}
                    >
                      Remove
                    </Button>
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

export default Subscriptions;