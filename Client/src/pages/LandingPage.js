import React from 'react';
import { Container } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import OurProjects from '../components/OurProjects';
import HappyClients from '../components/HappyClients';

const LandingPage = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="display-4 fw-bold mb-4">Welcome to WorkAlpha Solutions</h1>
          <p className="lead mb-4">Innovative solutions for your business growth</p>
          <button className="btn btn-light btn-lg" onClick={scrollToContact}>Get Started</button>
        </Container>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <Container>
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Consultation</h5>
                  <p className="card-text">Expert advice for your business needs</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Design</h5>
                  <p className="card-text">Creative and modern design solutions</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Marketing</h5>
                  <p className="card-text">Effective marketing strategies</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Components */}
      <OurProjects />
      <HappyClients />
      <div id="contact-section">
        <ContactForm />
      </div>
      <Newsletter />
    </div>
  );
};

export default LandingPage;