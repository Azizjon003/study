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
            {["Bosh sahifa", "Xizmatlar", "AI imkoniyatlari"].map((item) => (
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
            {["Bosh sahifa", "Xizmatlar", "AI imkoniyatlari"].map((item) => (
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
    id="bosh-sahifa"
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
          Ta'lim Sifatini Yaxshilashga Yangicha Yondashuv
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Bizning platformamiz yordamida bilim olish endi nafaqat samarali,
          balki maroqli ham bo'ladi.
        </p>
        <button className="bg-white text-purple-900 px-6 py-2 md:px-8 md:py-3 rounded-full text-lg font-semibold hover:bg-purple-200 transition duration-300">
          Boshlash
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
  <section id="xizmatlar" className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
          Bizning Xizmatlarimiz
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatedSection>
          <FeatureCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Interaktiv darslar"
            description="Qiziqarli va interaktiv darslar orqali bilimlaringizni mustahkamlang."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Oson yondashuv"
            description="Ta'lim olish jarayonini osonlashtirish uchun ishlab chiqilgan innovatsion vositalar va resurslar."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<MessageSquare className="w-12 h-12" />}
            title="Qo'llab-quvvatlash"
            description="Mutaxassislar va o'qituvchilar tomonidan berilgan yordamlardan foydalanish mumkin."
          />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureCard
            icon={<Home className="w-12 h-12" />}
            title="Moslashuvchanlik"
            description="O'zingizga qulay vaqtda va joyda ta'lim olish imkoniyatlari."
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
    id="ai-imkoniyatlari"
    className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white"
  >
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Intellektual O'rganish: AI Bilan Bilim Cho'qqilariga
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatedSection>
          <AIFeatureCard
            title="SUN'IY INTELLEKT ASOSIDAGI TAVSIYALAR"
            description="Sun'iy intellekt tizimimiz sizning o'quv jarayoningizni kuzatib boradi va eng mos kurslar, materiallar va mashqlarni tavsiya qiladi."
          />
        </AnimatedSection>
        <AnimatedSection>
          <AIFeatureCard
            title="REAL VAQTDA FEEDBACK"
            description="Sun'iy intellekt real vaqt rejimida javoblaringizni baholab, tezda fikr-mulohazalar beradi, bu esa sizga xatolaringizni tezda tuzatishga yordam beradi."
          />
        </AnimatedSection>
        <AnimatedSection>
          <AIFeatureCard
            title="PROGRESS MONITORING"
            description="Sun'iy intellekt sizning muvaffaqiyatlaringizni va rivojlanishingizni kuzatib boradi, sizga shaxsiy rivojlanish hisobotlarini taqdim etadi."
          />
        </AnimatedSection>
      </div>
    </div>
  </section>
);
const Footer = () => (
  <footer className="bg-purple-900 text-white py-8">
    <div className="container mx-auto text-center">
      <p className="mb-4">
        &copy; 2024 StudyTrack. Barcha huquqlar himoyalangan.
      </p>
      <div className="flex justify-center space-x-4 mb-4">
        <SocialIcon
          href="#"
          path="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        />
        <SocialIcon
          href="#"
          path="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        />
        <SocialIcon
          href="#"
          path="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
        />
      </div>
      <div className="text-sm">
        <p>www.Study-Track.com | +998940435349 | studytrack347@gmail.com</p>
        <p>Toshkent 100084, Amir Temur shox ko'chasi 108 uy</p>
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
