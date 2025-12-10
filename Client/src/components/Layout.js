import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header>
        <Navbar expand="lg" variant="dark" className="app-navbar" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/" className="brand">WorkAlpha</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <a className="nav-link" href="#contact-section">Contact</a>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>{children}</main>

      <footer className="app-footer">
        <Container>
          <div className="footer-inner">
            <div>© {new Date().getFullYear()} WorkAlpha</div>
            <div className="footer-links"> • <a href="#">Privacy</a></div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
