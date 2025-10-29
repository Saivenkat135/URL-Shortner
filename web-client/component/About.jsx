import React from 'react';
import Header from './Header';
const About = () => {
  const team = [
    {
      name: "Sai Venkat",
      role: "MERN Stack Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      bio: "Passionate developer with a knack for building scalable web applications"
    }
  ];

  const values = [
  {
    icon: "🚀",
    title: "Innovation",
    description: "I constantly explore new technologies and creative ideas to build unique and powerful solutions."
  },
  {
    icon: "🎯",
    title: "Excellence",
    description: "I focus on writing clean, efficient, and high-quality code to deliver top-notch results."
  },
  {
    icon: "🤝",
    title: "Commitment",
    description: "I’m dedicated to every project I take on, ensuring it aligns perfectly with the client’s vision."
  },
  {
    icon: "🌟",
    title: "Impact",
    description: "My goal is to create meaningful digital experiences that make a real difference for users and businesses."
  }
];


  return (
    <section className="about-section min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" id="about">
      {/* Hero Section */}
      <Header/>
      <div className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-cyan-400 text-sm font-semibold">About Me</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Transforming Ideas Into Reality
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              I'm a passionate innovator and developer dedicated to creating exceptional digital experiences that drive real business impact.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
                Get In Touch
              </button>
              <button className="px-8 py-3 border-2 border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative group hidden lg:block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Team collaboration"
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover group-hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Story Section */}
        {/* <div className="mb-32">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-cyan-500/20 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                My Story
              </h2>
              <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
                <p>
                  Founded in 2019, I began as a small team with a big vision: to bridge the gap between innovative technology and meaningful business impact. What started as a passion project has grown into a thriving portfolio that serves clients worldwide.
                </p>
                <p>
                  My journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence. I believe that great software isn't just about code—it's about understanding clients' needs and creating solutions that truly make a difference.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-purple-500/25">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">🎯 My Mission</h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    To empower businesses through innovative technology solutions that drive growth and measurable success.
                  </p>
                </div>
                <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-cyan-500/25">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors">✨ My Vision</h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                    To be the leading partner for digital transformation, creating lasting value and impact for clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <span className="text-blue-400 text-sm font-semibold">Core Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              What Drives Me
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col">
                  <div className="text-5xl md:text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed flex-grow">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-16">
            {/* <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
              <span className="text-purple-400 text-sm font-semibold">Team</span>
            </div> */}
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Meet Me
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="md:col-span-1 relative overflow-hidden h-64 md:h-auto">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                      <img 
                        src="/profile-image.png"
                        href="https://saivenkat.vercel.app"
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center space-y-4">
                      <div>
                        <a
                          href="https://saivenkat.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                            {member.name}
                          </h3>
                        </a>

                        <p className="text-cyan-400 font-semibold text-lg inline-block px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                          {member.role}
                        </p>
                      </div>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed text-lg">
                        {member.bio}
                      </p>
                    </div>
                  </div>
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