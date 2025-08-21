import React, { useState } from 'react';
import '../style/services.css';

import Header from './Header.jsx';

const Services = () => {
  const [activeTab, setActiveTab] = useState('web');

  const services = [
    {
      id: 'web',
      title: 'Web Development',
      icon: '🌐',
      description: 'Custom web applications built with modern technologies',
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'E-commerce Solutions',
        'Content Management Systems',
        'API Development',
        'Performance Optimization'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Next.js', 'TypeScript']
    },
    // {
    //   id: 'design',
    //   title: 'UI/UX Design',
    //   icon: '🎨',
    //   description: 'Beautiful and intuitive user experiences',
    //   features: [
    //     'User Research',
    //     'Wireframing',
    //     'Prototyping',
    //     'Visual Design',
    //     'Usability Testing',
    //     'Design Systems'
    //   ],
    //   technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision', 'Framer']
    // },
    // {
    //   id: 'cloud',
    //   title: 'Cloud Solutions',
    //   icon: '☁️',
    //   description: 'Scalable cloud infrastructure and deployment',
    //   features: [
    //     'Cloud Architecture',
    //     'DevOps Implementation',
    //     'Serverless Solutions',
    //     'Database Management',
    //     'Security & Compliance',
    //     'Performance Monitoring'
    //   ],
    //   technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform']
    // }
  ];

  const processes = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We analyze your requirements and define project scope',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Strategic planning and roadmap development',
      icon: '📋'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Creating wireframes and visual designs',
      icon: '✏️'
    },
    {
      step: '04',
      title: 'Development',
      description: 'Building your solution with best practices',
      icon: '⚙️'
    },
    {
      step: '05',
      title: 'Testing',
      description: 'Comprehensive testing and quality assurance',
      icon: '🧪'
    },
    {
      step: '06',
      title: 'Launch',
      description: 'Deployment and ongoing support',
      icon: '🚀'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Adams',
      company: 'TechCorp Inc.',
      role: 'CEO',
      testimonial: 'Outstanding service and exceptional results. They delivered beyond our expectations.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Robert Johnson',
      company: 'StartupXYZ',
      role: 'Founder',
      testimonial: 'Professional team that truly understands modern development. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Lisa Chen',
      company: 'E-commerce Plus',
      role: 'CTO',
      testimonial: 'They transformed our vision into reality with incredible attention to detail.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  function handleContact(){
    window.location.href = '/contact';
  }

  return (
    <section className="services-section" id="services">
        <Header/>
      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <h1 className="services-title">Our Services</h1>
          <p className="services-subtitle">
            We provide comprehensive digital solutions to help your business grow and thrive in the digital age.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="services-tabs">
          <div className="tabs-nav">
            {services.map((service) => (
              <button
                key={service.id}
                className={`tab-btn ${activeTab === service.id ? 'active' : ''}`}
                onClick={() => setActiveTab(service.id)}
              >
                <span className="tab-icon">{service.icon}</span>
                <span className="tab-label">{service.title}</span>
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {services.map((service) => (
              <div
                key={service.id}
                className={`tab-panel ${activeTab === service.id ? 'active' : ''}`}
              >
                <div className="service-details">
                  <div className="service-info">
                    <div className="service-icon">{service.icon}</div>
                    <h2 className="service-title">{service.title}</h2>
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-features">
                      <h3>What We Offer:</h3>
                      <ul>
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-technologies">
                      <h3>Technologies:</h3>
                      <div className="tech-tags">
                        {service.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="service-visual">
                    <div className="service-image">
                      <img 
                        src={`https://images.unsplash.com/photo-${
                          service.id === 'web' ? '1461749280684-6fb8de04b78a' :
                          service.id === 'mobile' ? '1512941937669-90a1b58e7e9c' :
                          service.id === 'design' ? '1558655146-364adaf1fcc9' :
                          '1451187580459-43d4fe02a67d'
                        }?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`}
                        alt={service.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="services-process">
          <h2 className="process-title">Our Process</h2>
          <div className="process-grid">
            {processes.map((process, index) => (
              <div key={index} className="process-card">
                <div className="process-step">{process.step}</div>
                <div className="process-icon">{process.icon}</div>
                <h3 className="process-name">{process.title}</h3>
                <p className="process-description">{process.description}</p>
              </div>
            ))}
          </div>
        </div>


        {/* CTA Section */}
        <div className="services-cta">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Let's discuss your project and bring your vision to life.
          </p>
          <button onClick={handleContact} className="cta-button">
            Start Your Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;