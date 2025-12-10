import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../config/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Consultation',
    location: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
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
    if (!formData.name || !formData.description || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('location', formData.location);
    data.append('image', image);

    console.log('📤 Submitting project:', { name: formData.name, description: formData.description, category: formData.category, location: formData.location, hasImage: !!image });

    try {
      const response = await api.post('/api/projects', data);
      console.log('✅ Response:', response.data);
      toast.success('Project added successfully!');
      setShowModal(false);
      setFormData({ name: '', description: '', category: 'Consultation', location: '' });
      setImage(null);
      fetchProjects();
    } catch (error) {
      console.error('❌ Error response:', error.response);
      const errorMsg = error.response?.data?.error || error.message || 'Error adding project';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/api/projects/${id}`);
        toast.success('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        const errorMsg = error.response?.data?.error || 'Error deleting project';
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
        <h2>Manage Projects</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Add New Project
        </Button>
      </div>

      <Row>
        {projects.map((project) => (
          <Col md={6} lg={4} key={project._id} className="mb-4">
            <Card>
              <Card.Img 
                variant="top" 
                src={getImageUrl(project.image)}
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image'; }}
              />
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {project.category} • {project.location}
                </Card.Subtitle>
                <Card.Text>
                  {project.description.substring(0, 80)}...
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => window.open(getImageUrl(project.image), '_blank')}
                  >
                    View Image
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Development">Development</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Project Image</Form.Label>
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
                {loading ? 'Adding...' : 'Add Project'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProjectManagement;