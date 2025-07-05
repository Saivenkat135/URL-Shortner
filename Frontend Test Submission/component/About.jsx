import React from 'react';
import '../style/About.css';
import profile_image from '../public/profile-image.png';
import Header from './Header';

const About = () => {

  const team = [
    {
      name: "Sai Venkat",
      role: "MERN Stack Develoeper",
      image: profile_image,
      bio: "Passionate developer with a knack for building scalable web applications"
    }
  ];

  const values = [
    {
      icon: "🚀",
      title: "Innovation",
      description: "We push boundaries and embrace new technologies to deliver cutting-edge solutions."
    },
    {
      icon: "🎯",
      title: "Excellence",
      description: "Quality is My priority. We strive for perfection in every project we undertake."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We build lasting relationships with My clients based on trust and mutual success."
    },
    {
      icon: "🌟",
      title: "Impact",
      description: "My work creates meaningful change and drives business growth for My clients."
    }
  ];

  return (
    <section className="about-section" id="about">
        <Header/>
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-title">About My Journey</h1>
            <p className="about-subtitle">
              We're a passionate team of innovators, designers, and developers dedicated to 
              transforming ideas into exceptional digital experiences.
            </p>
          </div>
          <div className="about-hero-image">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Team collaboration"
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="about-story">
          <div className="story-content">
            <h2 className="story-title">My Story</h2>
            <p className="story-text">
              Founded in 2019, we began as a small team with a big vision: to bridge the gap 
              between innovative technology and meaningful business impact. What started as a 
              passion project has grown into a thriving company that serves clients worldwide.
            </p>
            <p className="story-text">
              My journey has been marked by continuous learning, adaptation, and an unwavering 
              commitment to excellence. We believe that great software isn't just about code—it's 
              about understanding My clients' needs and creating solutions that truly make a difference.
            </p>
            <div className="story-highlights">
              <div className="highlight">
                <h3>My Mission</h3>
                <p>To empower businesses through innovative technology solutions that drive growth and success.</p>
              </div>
              <div className="highlight">
                <h3>My Vision</h3>
                <p>To be the leading partner for digital transformation, creating lasting value for My clients.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-values">
          <h2 className="values-title">My Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="about-team">
          <h2 className="team-title">Meet My Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;