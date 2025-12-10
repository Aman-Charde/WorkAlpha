import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../config/api';

const HappyClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageName) => {
    return `${api.defaults.baseURL}/uploads/${imageName}`;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">Loading clients...</div>
      </Container>
    );
  }

  return (
    <section className="py-5 happy-clients-section">
      <Container>
        <h2 className="text-center mb-5" style={{ animation: 'fadeInUp 0.6s ease-out' }}>Happy Clients</h2>
        <Row>
          {clients.length === 0 ? (
            <Col>
              <div className="text-center text-muted">
                <h4>No clients yet</h4>
                <p>Add clients from the admin panel</p>
              </div>
            </Col>
          ) : (
            clients.map((client, index) => (
              <Col md={4} key={client._id} className="mb-4">
                <Card 
                  className="h-100 text-center border-0 shadow-sm client-card"
                  style={{ animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.15}s backwards` }}
                >
                  <Card.Body>
                    <div className="client-avatar-wrapper" style={{ animation: 'scaleIn 0.5s ease-out backwards' }}>
                      <img
                        src={getImageUrl(client.image)}
                        alt={client.name}
                        className="rounded-circle mb-3 client-avatar"
                        style={{ 
                          width: '120px', 
                          height: '120px', 
                          objectFit: 'cover',
                          transition: 'all 0.3s ease'
                        }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/120x120?text=Avatar'; }}
                      />
                    </div>
                    <Card.Text className="fst-italic text-muted mb-3">
                      "{client.description.substring(0, 150)}..."
                    </Card.Text>
                    <Card.Title style={{ color: '#667eea' }}>{client.name}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {client.designation}
                      {client.company && ` • ${client.company}`}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default HappyClients;