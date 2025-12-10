import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import ProjectManagement from '../components/AdminPanel/ProjectManagement';
import ClientManagement from '../components/AdminPanel/ClientManagement';
import ContactResponses from '../components/AdminPanel/ContactResponses';
import Subscriptions from '../components/AdminPanel/Subscriptions';
import Dashboard from '../components/AdminPanel/Dashboard';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'contacts':
        return <ContactResponses />;
      case 'subscriptions':
        return <Subscriptions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid className="admin-page">
      <Row>
        <Col md={3} lg={2} className="sidebar p-0">
          <div className="p-4">
            <h3 className="mb-4">Admin Panel</h3>
            <Nav className="flex-column">
              <Nav.Link 
                onClick={() => setActiveTab('dashboard')}
                className={activeTab === 'dashboard' ? 'active' : ''}
              >
                📊 Dashboard
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveTab('projects')}
                className={activeTab === 'projects' ? 'active' : ''}
              >
                🏗️ Manage Projects
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveTab('clients')}
                className={activeTab === 'clients' ? 'active' : ''}
              >
                👥 Manage Clients
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveTab('contacts')}
                className={activeTab === 'contacts' ? 'active' : ''}
              >
                📧 Contact Responses
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveTab('subscriptions')}
                className={activeTab === 'subscriptions' ? 'active' : ''}
              >
                📬 Newsletter Subscriptions
              </Nav.Link>
            </Nav>
          </div>
        </Col>
        
        <Col md={9} lg={10} className="p-4">
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;