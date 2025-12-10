import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../config/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/api/subscriptions', { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info('This email is already subscribed.');
      } else {
        const errorMsg = error.response?.data?.error || 'Error subscribing. Please try again.';
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} style={{ animation: 'slideInLeft 0.6s ease-out' }}>
            <h3 style={{ animation: 'fadeInUp 0.6s ease-out 0.1s backwards' }}>Subscribe to Our Newsletter</h3>
            <p className="mb-0" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s backwards', fontSize: '1.1rem' }}>Get the latest updates and offers directly in your inbox</p>
          </Col>
          <Col md={6} style={{ animation: 'slideInRight 0.6s ease-out' }}>
            <Form onSubmit={handleSubmit} className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="lg"
                className="newsletter-input"
                style={{ animation: 'slideInRight 0.5s ease-out 0.1s backwards' }}
              />
              <Button 
                variant="light" 
                type="submit"
                size="lg"
                disabled={loading}
                className="px-4"
                style={{ 
                  animation: 'slideInRight 0.5s ease-out 0.2s backwards',
                  fontWeight: 'bold',
                  color: '#667eea',
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? '...' : 'Subscribe'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;