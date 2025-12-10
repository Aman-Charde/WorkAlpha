import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../config/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/api/contact', formData);
      toast.success('Thank you! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: ''
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error submitting form. Please try again.';
      toast.error(errorMsg);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-dark text-white contact-form-section">
      <Container>
        <h2 className="text-center mb-4" style={{ animation: 'fadeInUp 0.6s ease-out' }}>Get a Free Consultation</h2>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} style={{ animation: 'scaleIn 0.6s ease-out' }}>
              <Form.Group className="mb-3" style={{ animation: 'slideInLeft 0.5s ease-out 0.1s backwards' }}>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  size="lg"
                  className="form-input-animated"
                />
              </Form.Group>

              <Form.Group className="mb-3" style={{ animation: 'slideInLeft 0.5s ease-out 0.2s backwards' }}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="lg"
                  className="form-input-animated"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" style={{ animation: 'slideInLeft 0.5s ease-out 0.3s backwards' }}>
                    <Form.Control
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                      size="lg"
                      className="form-input-animated"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" style={{ animation: 'slideInLeft 0.5s ease-out 0.4s backwards' }}>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="Area, City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      size="lg"
                      className="form-input-animated"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                className="w-100 py-3 button-animated"
                disabled={loading}
                style={{ animation: 'fadeInUp 0.6s ease-out 0.5s backwards' }}
              >
                {loading ? 'Submitting...' : 'Get Quick Quote'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;