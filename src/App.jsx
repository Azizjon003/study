import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed w-full transition-all duration-300 z-50 ${
        isScrolled ? "bg-purple-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          StudyTrack
        </h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {["Home", "Services", "AI Capabilities"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item
                    .toLowerCase()
                    .replace("'", "")
                    .replace(" ", "-")}`}
                  className="text-white hover:text-purple-300 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-purple-900 p-4">
          <ul className="space-y-2">
            {["Home", "Services", "AI Capabilities"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item
                    .toLowerCase()
                    .replace("'", "")
                    .replace(" ", "-")}`}
                  className="block text-white hover:text-purple-300 transition duration-300"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

const Homes = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center text-white relative overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900 py-20 md:py-0"
  >
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <AnimatedSection className="w-full md:w-1/4 mb-8 md:mb-0">
        <div className="rounded-lg shadow-lg p-4 transform md:-rotate-6">
          <img
            src="https://s3.timeweb.cloud/729e17de-andasoft-buckets/1.png"
            alt="Left screenshot"
            className="w-full h-auto rounded"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="w-full md:w-1/2 text-center px-4 md:px-8 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          A New Approach to Improving Education Quality
        </h2>
        <p className="text-lg md:text-xl mb-8">
          With our platform, learning becomes not only effective but also
          enjoyable.
        </p>
        <button className="bg-white text-purple-900 px-6 py-2 md:px-8 md:py-3 rounded-full text-lg font-semibold hover:bg-purple-200 transition duration-300">
          Get Started
        </button>
      </AnimatedSection>

      <AnimatedSection className="w-full md:w-1/4">
        <div className="rounded-lg shadow-lg p-4 transform md:rotate-6">
          <img
            src="https://s3.timeweb.cloud/729e17de-andasoft-buckets/2.png"
            alt="Right screenshot"
            className="w-full h-auto rounded"
          />
        </div>
      </AnimatedSection>
    </div>
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown size={32} />
    </div>
  </section>
);

const Features = () => (
  <section id="services" className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
          Our Services
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatedSection>
          <FeatureCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Interactive Lessons"
            description="Enhance your knowledge with engaging and interactive lessons."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Easy Approach"
            description="Innovative tools and resources designed to make the learning process easier."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<MessageSquare className="w-12 h-12" />}
            title="Support"
            description="Access assistance provided by experts and educators."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<Home className="w-12 h-12" />}
            title="Flexibility"
            description="Opportunities to learn at your convenience, anytime and anywhere."
          />
        </AnimatedSection>
      </div>
    </div>
  </section>
);

const AIFeatureCard = ({ title, description }) => (
  <div className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition duration-300">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-200">{description}</p>
  </div>
);

const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
    <div className="text-purple-600 mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold mb-4 text-purple-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AIFeatures = () => (
  <section
    id="ai-capabilities"
    className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white"
  >
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Intelligent Learning: Reach New Heights with AI
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatedSection>
          <AIFeatureCard
            title="AI-BASED RECOMMENDATIONS"
            description="Our AI system tracks your learning progress and recommends the most suitable courses, materials, and exercises."
          />
        </AnimatedSection>
        <AnimatedSection>
          <AIFeatureCard
            title="REAL-TIME FEEDBACK"
            description="AI evaluates your responses in real-time and quickly provides feedback, helping you correct mistakes instantly."
          />
        </AnimatedSection>
        <AnimatedSection>
          <AIFeatureCard
            title="PROGRESS MONITORING"
            description="Track your educational achievements, and identify weak points and strengths through AI data analysis."
          />
        </AnimatedSection>
      </div>
    </div>
  </section>
);const Footer = () => (
  <footer className="bg-purple-900 text-white py-8">
    <div className="container mx-auto text-center">
      <p className="mb-4">
        &copy; 2024 StudyTrack. All rights reserved.
      </p>
      
      <div className="text-sm">
        <p>www.Study-Track.com | +998940435349 | studytrack347@gmail.com</p>
        <p>Toshkent 100084, Amir Temur Avenue, 108</p>
      </div>
    </div>
  </footer>
);
const SocialIcon = ({ href, path }) => (
  <a href={href} className="hover:text-purple-300 transition duration-300">
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  </a>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Homes />
        <Features />
        <AIFeatures />
        {/* Boshqa seksiyalar uchun joylar (O'qituvchilar, Forum, Bog'lanish) */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
