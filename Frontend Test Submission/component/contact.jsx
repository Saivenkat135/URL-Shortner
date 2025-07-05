import React, { useState } from 'react';
import Header from './Header';
import '../style/Contact.css';
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [buttonText, setButtonText] = useState("Send Message");
  const [status, setStatus] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setButtonText("Sending...");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    console.log("form submitting", templateParams);
    
    emailjs
      .send(
        "service_xzm6rjv",        // Replace with your EmailJS service ID
        "template_bampy28",       // Replace with your EmailJS template ID
        templateParams,
        "5DTaejZwhhesdiAzZ"         // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus({ success: true, message: "Message sent successfully!" });
          setFormData({ name: '', email: '', subject: '', message: '' });
          console.log("form submitting success", templateParams);
        },
        (error) => {
          console.log("form submitting fail", templateParams);
          console.error(error);
          setStatus({ success: false, message: "Failed to send message." });
        }
      )
      .finally(() => setButtonText("Send Message"));
  };

  return (
    <section className="contact-section" id="contact">
        <Header/>
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Ready to start your next project? Let's work together to bring your vision to life.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+91 8803434888</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>saivenkatkallepalli@gmail.com</p>
              </div>
            </div>

            </div>
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={`form-input ${errors.name ? 'error-input' : ''}`}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className={`form-input ${errors.email ? 'error-input' : ''}`}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={`form-input ${errors.subject ? 'error-input' : ''}`}
                />
                {errors.subject && <div className="error-message">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="6"
                  className={`form-textarea ${errors.message ? 'error-input' : ''}`}
                ></textarea>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              <button type="submit" className="submit-btn">
                <span>{buttonText}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                </svg>
              </button>

              {status.message && (
                <div className={`status-message ${status.success ? "success" : "error"}`} role="alert">
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;