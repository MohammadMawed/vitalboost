"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingCart, Menu, X, Phone, Mail, Star, Award, TrendingUp, Zap, LogIn 
} from 'lucide-react';

// Static data moved outside the component to avoid re-creation on each render
  const products = [
    {
      id: 1,
      name: "VitalEssenz Plus",
      description: "Premium Vitamin-Komplex für gesteigerte Energie",
      price: 39.99,
      category: "vitamine",
      image: "/images/vitamin.png",
      tags: ["Bestseller", "Neu"]
    },
  {
    id: 2,
    name: "ImmunoGuard Pro",
    description: "Hochdosierter Immun-Booster mit Zink",
    price: 44.99,
    category: "immunsystem",
    image: "/images/boost.png",
    tags: ["Premium"]
  },
  {
    id: 3,
    name: "OmegaForce",
    description: "Hochwertige Omega-3 Fettsäuren",
    price: 29.99,
    category: "herz",
    image: "/images/omega3.png",
    tags: ["Vegan"]
  },
  {
    id: 4,
      name: "MagnesiumPlus",
      description: "Magnesium für Muskeln und Nerven",
      price: 24.99,
      category: "mineralstoffe",
      image: "/images/magnesium.png",
      tags: ["Beliebt"]
    },
    {
      id: 5,
      name: "SleepWell",
      description: "Natürlicher Schlaf-Optimierer",
      price: 34.99,
      category: "schlaf",
      image: "/images/sleep.png",
      tags: ["Neu"]
    },
    {
      id: 6,
      name: "BrainBoost",
      description: "Konzentration und mentale Leistung",
      price: 49.99,
      category: "gehirn",
      image: "/images/boost.png",
      tags: ["Premium"]
    }
  ];

const categories = ['vitamine', 'immunsystem', 'herz', 'mineralstoffe', 'schlaf', 'gehirn'];

// Pre-filtered arrays for static sections
const featuredProducts = products.filter(p => p.tags.includes('Premium'));
const newArrivals = products.filter(p => p.tags.includes('Neu'));

const LandingPage = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const navigateToProduct = (productId) => {
    router.push(`/${productId}`);
  };

  // Memoized filtered product list based on active category
  const filteredProducts = useMemo(() => {
    return products.filter(product => activeCategory === 'all' || product.category === activeCategory);
  }, [activeCategory]);

  // Update the Header component for better aesthetics and mobile compatibility with blue color scheme
  const Header = () => (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'nav-blue' : 'nav-blue-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">
              VitalBoost
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">Startseite</Link>
            <Link href="/products" className="text-white/90 hover:text-white transition-colors font-medium">Produkte</Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium">Über Uns</Link>
            <Link href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">Kontakt</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-white hover:text-white/90 transition-colors cursor-pointer" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItems}
                </span>
              )}
            </div>
            <Link 
              href="/login"
              className="hidden md:flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-lg hover:bg-blue-700/50 text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with improved animation and styling */}
        <div 
          className={`md:hidden absolute left-0 right-0 top-full bg-blue-800 border-t border-blue-700 shadow-lg transform transition-all duration-300 z-40 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col py-2">
            <Link href="/" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Startseite</Link>
            <Link href="/products" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Produkte</Link>
            <Link href="/about" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Über Uns</Link>
            <Link href="#contact" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Kontakt</Link>
            <Link 
              href="/login"
              className="px-4 py-3 text-white font-medium hover:bg-blue-700"
            >
              <span className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );

  // Updated responsive hero section with padding to prevent navbar overlap
  const HeroSection = () => (
    <section className="relative min-h-screen pt-16 md:pt-24 flex items-center bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              Ihre <span className="relative inline-block">
                <span className="relative z-10">Gesundheit</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-500 opacity-50 -rotate-1"></span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Unsere Leidenschaft.
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Entdecken Sie unsere wissenschaftlich entwickelten Nahrungsergänzungsmittel für Ihr optimales Wohlbefinden. <span className="font-semibold text-blue-300">100% natürlich. 100% wirksam.</span>
            </p>
            <div className="flex space-x-4">
              <button className="group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-blue-600/30 transition-shadow">
                <span className="relative z-10">Jetzt Entdecken</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button className="group relative bg-white text-gray-900 px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-white/30 transition-shadow">
                <span className="relative z-10">Mehr Erfahren</span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-10 flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span>4.9/5</span>
              </div>
              <div className="flex items-center">
                <Award size={20} className="mr-1 text-blue-400" />
                <span>Zertifiziert</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                  Über 10.000 zufriedene Kunden
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative px-4 sm:px-0">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full filter blur-md"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-500/20 rounded-full filter blur-md"></div>
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-300 rotate-1 hover:rotate-0">
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl -translate-x-2 translate-y-2"></div>
              <img 
                src="/images/protein.png" 
                alt="VitalBoost Produkte" 
                className="rounded-xl shadow-xl object-cover w-full h-auto max-w-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-900/40 rounded-2xl"></div>
              <div className="absolute -left-8 top-10 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg transform -rotate-6">
                <div className="font-bold">Premium</div>
                <div className="text-sm text-blue-600">100% Natürlich</div>
              </div>
              <div className="absolute -right-6 bottom-12 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
                <div className="font-bold">Neu</div>
                <div className="text-sm">VitalEssenz+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Section that highlights the benefits/USPs of VitalBoost
  const ProductBenefits = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-12">Warum VitalBoost?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Star, title: "Höchste Qualität", desc: "Premium Inhaltsstoffe" },
            { icon: Award, title: "Zertifiziert", desc: "ISO 9001:2015" },
            { icon: TrendingUp, title: "Nachweisbar", desc: "Wissenschaftlich getestet" },
            { icon: Zap, title: "Innovativ", desc: "Modernste Formulierungen" }
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-black mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Section for Premium products
  const FeaturedProductsSection = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Premium Produkte</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => navigateToProduct(product.id)}
              className="flex bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img src={product.image} alt={product.name} className="w-1/3 object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl text-black font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl text-black font-bold">€{product.price}</span>
                  <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Section for New Arrivals
  const NewArrivalsSection = () => (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Neue Produkte</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {newArrivals.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl p-6">
              <div className="mb-4">
                <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">Neu</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">€{product.price}</span>
                <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Vorbestellen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Updated product grid
  const ProductShowcase = () => (
    <section id="products" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">
          Unsere Produktpalette
        </h2>
        
        {/* Responsive category filters */}
        <div className="flex flex-nowrap overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 hide-scrollbar">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full border ${
              activeCategory === 'all' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'border-gray-300 text-gray-600 hover:border-blue-600'
            } transition-colors`}
          >
            Alle Produkte
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border capitalize ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border-gray-300 text-gray-600 hover:border-blue-600'
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );

  // Update the ProductCard component:
  const ProductCard = ({ product }) => {
    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart();
    };

    return (
      <div 
        onClick={() => navigateToProduct(product.id)}
        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden transform hover:-translate-y-1 product-card-mobile"
      >
        {/* Product Image Container */}
        <div className="product-image-mobile bg-gray-50 relative">
          {/* Fallback content */}
          <div className="empty-image-placeholder">
            <span>Produktbild</span>
          </div>
          
          {/* Product Image with optimized loading */}
          <img 
            src={product.image || "/images/placeholder.png"} 
            alt={product.name}
            className="mobile-image-fix safari-image-fix absolute inset-0"
            loading="eager"
            width="200"
            height="200"
            style={{objectFit: "contain"}}
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentNode.querySelector('.empty-image-placeholder').style.display = 'flex';
            }}
          />
          
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {product.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* ...existing product info... */}
      </div>
    );
  };

  // Contact section with a form and contact details
  const ContactSection = () => (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-12">Kontaktieren Sie uns</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl text-black font-bold mb-4">Kontakt aufnehmen</h3>
            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 text-blue-600 mr-3" />
              <span>06332/991-0</span>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <span>info@vital-boost.de</span>
            </div>
            <p className="mt-6 text-gray-600">
              Europagalerie 222, 66482 Zweibrücken<br />
              Deutschland
            </p>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">E-Mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ihre E-Mail"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Nachricht</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ihre Nachricht"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition w-full">
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Was unsere Kunden sagen</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">Echte Erfahrungen unserer zufriedenen Kunden</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: "Nach nur zwei Wochen mit EnergyEssence konnte ich einen deutlichen Unterschied in meiner täglichen Energie und Konzentration spüren. Fantastisches Produkt!",
              name: "Marion S.",
              role: "Studentin, 24"
            },
            // ...other testimonials...
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gray-800 p-8 rounded-xl relative">
              {/* ...testimonial card content... */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Footer with quick links and social media
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VitalBoost</h3>
            <p className="text-blue-200">
              Ihre vertrauenswürdige Quelle für hochwertige Nahrungsergänzungsmittel.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white">Startseite</a></li>
              <li><a href="#products" className="text-blue-200 hover:text-white">Produkte</a></li>
              <li><a href="#about" className="text-blue-200 hover:text-white">Über Uns</a></li>
              <li><a href="#contact" className="text-blue-200 hover:text-white">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Folgen Sie uns</h3>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600">
                <span className="sr-only">Facebook</span>
                F
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600">
                <span className="sr-only">Instagram</span>
                I
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-600">
                <span className="sr-only">Twitter</span>
                T
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} VitalBoost GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header />
      <HeroSection />
      <ProductBenefits />
      <FeaturedProductsSection />
      <NewArrivalsSection />
      <ProductShowcase />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
