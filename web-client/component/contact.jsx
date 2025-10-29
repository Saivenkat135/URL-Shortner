import React, { useState } from 'react';
import Hero from './Hero';
import Header from "./Header";

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

    setTimeout(() => {
      setStatus({ success: true, message: "Message sent successfully! 🎉" });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setButtonText("Send Message");
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 px-6" id="contact">
      <div className="max-w-7xl mx-auto relative z-10">


        {/* Header */}
        <Header/>
        <div className="text-center mt-[20px] mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? Let's work together to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Phone Card */}
          <div className="group bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-2xl p-8 border border-cyan-500/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 hover:border-cyan-500/60">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-cyan-600/40 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Phone</h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors">+91 8803434888</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="group bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-2xl p-8 border border-blue-500/30 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-3 hover:border-blue-500/60">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-blue-600/40 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-300 mb-2">Email</h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors break-all">saivenkatkallepalli@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="group bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-2xl p-8 border border-purple-500/30 shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-3 hover:border-purple-500/60">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-purple-600/40 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-2">Location</h3>
                <p className="text-slate-300 group-hover:text-slate-200 transition-colors">Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-3xl p-10 border border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300">
              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className={`w-full px-6 py-3 rounded-xl bg-slate-700/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-slate-400 ${
                      errors.name 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-cyan-500/30 focus:border-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-red-400 text-sm flex items-center space-x-1">
                      <span>✕</span>
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className={`w-full px-6 py-3 rounded-xl bg-slate-700/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-slate-400 ${
                      errors.email 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-blue-500/30 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-400 text-sm flex items-center space-x-1">
                      <span>✕</span>
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject Input */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className={`w-full px-6 py-3 rounded-xl bg-slate-700/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-slate-400 ${
                      errors.subject 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-purple-500/30 focus:border-purple-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-2 text-red-400 text-sm flex items-center space-x-1">
                      <span>✕</span>
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows="6"
                    className={`w-full px-6 py-3 rounded-xl bg-slate-700/50 border-2 transition-all duration-300 focus:outline-none text-white placeholder-slate-400 resize-none ${
                      errors.message 
                        ? 'border-red-500/50 focus:border-red-500' 
                        : 'border-cyan-500/30 focus:border-cyan-500'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-red-400 text-sm flex items-center space-x-1">
                      <span>✕</span>
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group"
                >
                  <span>{buttonText}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                  </svg>
                </button>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-center font-semibold transition-all duration-300 ${
                      status.success
                        ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                        : 'bg-red-500/20 border border-red-500/50 text-red-300'
                    }`}
                    role="alert"
                  >
                    {status.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;