import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from '../config/api';

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageName) => {
    return `${api.defaults.baseURL}/uploads/${imageName}`;
  };

  const handleReadMore = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">Loading projects...</div>
      </Container>
    );
  }

  return (
    <section className="py-5 bg-light our-projects-section">
      <Container>
        <h2 className="text-center mb-5">Our Projects</h2>
        <Row>
          {projects.length === 0 ? (
            <Col>
              <div className="text-center text-muted">
                <h4>No projects yet</h4>
                <p>Add projects from the admin panel</p>
              </div>
            </Col>
          ) : (
            projects.map((project, index) => (
              <Col md={4} key={project._id} className="mb-4">
                <Card 
                  className="h-100 shadow-sm"
                  style={{ animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.15}s backwards` }}
                >
                  <Card.Img 
                    variant="top" 
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Image'; }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: '#667eea', fontWeight: '700' }}>{project.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {project.category} • {project.location}
                    </Card.Subtitle>
                    <Card.Text>
                      {project.description.length > 100 
                        ? `${project.description.substring(0, 100)}...`
                        : project.description
                      }
                    </Card.Text>
                    <Button 
                      variant="primary" 
                      className="w-100" 
                      onClick={() => handleReadMore(project)}
                      style={{ animation: 'fadeInUp 0.6s ease-out backwards' }}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        {/* Modal for showing full project details */}
        <Modal show={showModal} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Modal.Title>{selectedProject ? selectedProject.name : 'Project'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProject && (
              <div style={{ animation: 'scaleIn 0.4s ease-out' }}>
                <img
                  src={getImageUrl(selectedProject.image)}
                  alt={selectedProject.name}
                  style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Image'; }}
                />
                <p style={{ fontSize: '1.1rem', color: '#2c3e50', lineHeight: '1.6' }}>{selectedProject.description}</p>
                <p style={{ color: '#667eea', fontWeight: '600' }}><strong>Category:</strong> {selectedProject.category}</p>
                <p style={{ color: '#764ba2', fontWeight: '600' }}><strong>Location:</strong> {selectedProject.location}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer style={{ background: '#f8f9fa' }}>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default OurProjects;