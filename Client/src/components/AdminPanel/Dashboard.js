import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../config/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscriptions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, subsRes] = await Promise.all([
        api.get('/api/projects'),
        api.get('/api/clients'),
        api.get('/api/contact'),
        api.get('/api/subscriptions')
      ]);

      setStats({
        projects: projectsRes.data.length,
        clients: clientsRes.data.length,
        contacts: contactsRes.data.length,
        subscriptions: subsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading dashboard...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="text-center border-primary">
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <h2 className="text-primary">{stats.projects}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-success">
            <Card.Body>
              <Card.Title>Clients</Card.Title>
              <h2 className="text-success">{stats.clients}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-warning">
            <Card.Body>
              <Card.Title>Contact Forms</Card.Title>
              <h2 className="text-warning">{stats.contacts}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center border-info">
            <Card.Body>
              <Card.Title>Subscriptions</Card.Title>
              <h2 className="text-info">{stats.subscriptions}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;