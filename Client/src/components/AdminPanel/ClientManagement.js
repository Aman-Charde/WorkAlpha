import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../config/api';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    company: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate image
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    // Validate form data
    if (!formData.name || !formData.designation || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('description', formData.description);
    data.append('company', formData.company);
    data.append('image', image);

    console.log('📤 Submitting client:', { name: formData.name, designation: formData.designation, description: formData.description, company: formData.company, hasImage: !!image });

    try {
      const response = await api.post('/api/clients', data);
      console.log('✅ Response:', response.data);
      toast.success('Client added successfully!');
      setShowModal(false);
      setFormData({ name: '', designation: '', description: '', company: '' });
      setImage(null);
      fetchClients();
    } catch (error) {
      console.error('❌ Error response:', error.response);
      const errorMsg = error.response?.data?.error || error.message || 'Error adding client';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await api.delete(`/api/clients/${id}`);
        toast.success('Client deleted successfully!');
        fetchClients();
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error deleting client';
        toast.error(errorMsg);
      }
    }
  };

  const getImageUrl = (imageName) => {
    return `${api.defaults.baseURL}/uploads/${imageName}`;
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Clients</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add New Client
        </Button>
      </div>

      <Row>
        {clients.length === 0 ? (
          <Col>
            <div className="text-center text-muted py-5">
              <h4>No clients added yet</h4>
              <p>Add your first client using the button above</p>
            </div>
          </Col>
        ) : (
          clients.map((client) => (
            <Col md={6} lg={4} key={client._id} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={getImageUrl(client.image)}
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x250?text=Image'; }}
                />
                <Card.Body>
                  <Card.Title>{client.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {client.designation}
                    {client.company && ` • ${client.company}`}
                  </Card.Subtitle>
                  <Card.Text>
                    {client.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => window.open(getImageUrl(client.image), '_blank')}
                    >
                      View Image
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(client._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add Client Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    placeholder="e.g., CEO, Designer, Developer"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Client feedback or testimonial..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Company name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF. Max size: 5MB
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Client'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ClientManagement;