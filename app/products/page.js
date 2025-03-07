"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, LogIn, Search, Filter, ChevronDown } from 'lucide-react';

// Extended product data
const products = [
    {
        id: 1,
        name: "VitalEssenz Plus",
        description: "Premium Vitamin-Komplex für gesteigerte Energie",
        price: 39.99,
        category: "vitamine",
        image: "/images/vitamin.png",
        tags: ["Bestseller", "Neu"],
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: "ImmunoGuard Pro",
        description: "Hochdosierter Immun-Booster mit Zink",
        price: 44.99,
        category: "immunsystem",
        image: "/images/boost.png",
        tags: ["Premium"],
        rating: 4.9,
        reviews: 89
    },
    {
        id: 3,
        name: "OmegaForce",
        description: "Hochwertige Omega-3 Fettsäuren",
        price: 29.99,
        category: "herz",
        image: "/images/omega3.png",
        tags: ["Vegan"],
        rating: 4.7,
        reviews: 56
    },
    {
        id: 4,
        name: "MagnesiumPlus",
        description: "Magnesium für Muskeln und Nerven",
        price: 24.99,
        category: "mineralstoffe",
        image: "/images/magnesium.png",
        tags: ["Beliebt"],
        rating: 4.6,
        reviews: 78
    },
    {
        id: 5,
        name: "SleepWell",
        description: "Natürlicher Schlaf-Optimierer",
        price: 34.99,
        category: "schlaf",
        image: "/images/sleep.png",
        tags: ["Neu"],
        rating: 4.8,
        reviews: 45
    },
    {
        id: 6,
        name: "BrainBoost",
        description: "Konzentration und mentale Leistung",
        price: 49.99,
        category: "gehirn",
        image: "/images/boost.png",
        tags: ["Premium"],
        rating: 4.9,
        reviews: 67
    },
    // Additional products
    {
        id: 7,
        name: "VitaminD Complex",
        description: "Hochdosiertes Vitamin D3 + K2",
        price: 19.99,
        category: "vitamine",
        image: "/images/vitamin-d.png",
        tags: ["Essential"],
        rating: 4.7,
        reviews: 92
    },
    {
        id: 8,
        name: "Joint Care Pro",
        description: "Gelenkunterstützung mit Glucosamin",
        price: 39.99,
        category: "gelenke",
        image: "/images/joint.png",
        tags: ["Premium"],
        rating: 4.8,
        reviews: 34
    },
    {
        id: 9,
        name: "BeautyCollagen",
        description: "Premium Kollagen für Haut und Haare",
        price: 54.99,
        category: "beauty",
        image: "/images/collagen.png",
        tags: ["Neu", "Premium"],
        rating: 4.9,
        reviews: 23
    },
    {
        id: 10,
        name: "SportsPro BCAA",
        description: "Verzweigtkettige Aminosäuren für Sportler",
        price: 29.99,
        category: "sport",
        image: "/images/bcaa.png",
        tags: ["Sport"],
        rating: 4.7,
        reviews: 88
    },
    {
        id: 11,
        name: "PowerProtein Plus",
        description: "Premium Protein-Shake mit essentiellen Aminosäuren",
        price: 49.99,
        category: "sport",
        image: "/images/protein.png",
        tags: ["Sport", "Premium", "Bestseller"],
        rating: 4.9,
        reviews: 156,
        longDescription: "Unser PowerProtein Plus ist eine hochwertige Proteinformel mit einem ausgewogenen Aminosäureprofil. Ideal für Muskelaufbau und Regeneration nach dem Training.",
        ingredients: "Molkenprotein-Isolat, Molkenprotein-Konzentrat, BCAA-Komplex, Vitaminkomplex",
        usage: "30g (1 Messlöffel) mit 300ml Wasser oder Milch mischen. 1-2 Portionen täglich.",
        stock: 45
    }
];

const categories = [
    'Alle',
    'Vitamine',
    'Immunsystem',
    'Herz',
    'Mineralstoffe',
    'Schlaf',
    'Gehirn',
    'Gelenke',
    'Beauty',
    'Sport',
    'Protein'  // Added new category
];

export default function ProductsPage() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Alle');
    const [sortBy, setSortBy] = useState('recommended');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesCategory = activeCategory === 'Alle' || 
                                  product.category.toLowerCase() === activeCategory.toLowerCase();
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return b.reviews - a.reviews;
            }
        });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'nav-blue' : 'nav-blue-transparent'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl sm:text-2xl font-bold text-white">
                                VitalBoost
                            </span>
                        </Link>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Produkt suchen..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <nav className="flex space-x-6">
                                <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">Startseite</Link>
                                <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium">Über Uns</Link>
                                <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-medium">Kontakt</Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link 
                                href="/login"
                                className="hidden md:flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </Link>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-blue-700/50 text-white">
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                <div 
                    className={`md:hidden absolute left-0 right-0 top-full bg-blue-800 border-t border-blue-700 shadow-lg transform transition-all duration-300 z-40 ${
                        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="p-4 border-b border-blue-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Produkt suchen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <nav className="flex flex-col">
                        <Link href="/" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Startseite</Link>
                        <Link href="/about" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Über Uns</Link>
                        <Link href="/contact" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Kontakt</Link>
                        <Link 
                            href="/login"
                            className="px-4 py-3 text-white font-medium hover:bg-blue-700 flex items-center"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            <span>Login</span>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content - adjusted padding to prevent navbar overlap */}
            <main className="pt-24 sm:pt-28 pb-20">
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unsere Produkte</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Entdecken Sie unsere Auswahl an hochwertigen Nahrungsergänzungsmitteln, 
                            entwickelt für Ihr Wohlbefinden.
                        </p>
                    </div>

                    {/* Filters and Sort */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        activeCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="recommended">Empfohlen</option>
                                <option value="price-asc">Preis: Aufsteigend</option>
                                <option value="price-desc">Preis: Absteigend</option>
                                <option value="rating">Beste Bewertung</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <Link 
                                href={`/${product.id}`}
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-duration-300 flex flex-col h-full product-card-mobile"
                            >
                                <div className="product-image-mobile bg-gray-50 relative">
                                    {/* Fallback text that shows if image fails */}
                                    <div className="empty-image-placeholder">
                                        <span>Produktbild</span>
                                    </div>
                                    
                                    {/* The actual image with critical attributes */}
                                    <img 
                                        src={product.image || "/images/placeholder.png"} 
                                        alt={product.name}
                                        className="mobile-image-fix safari-image-fix absolute inset-0"
                                        loading="eager"
                                        width="200"
                                        height="200"
                                        decoding="async"
                                        style={{objectFit: "contain"}}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.style.display = 'none';
                                            e.target.parentNode.querySelector('.empty-image-placeholder').style.display = 'flex';
                                        }}
                                    />
                                    
                                    {/* Product tags */}
                                    <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
                                        {product.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="p-4 flex flex-col flex-grow">
                                    {/* ...existing product text content... */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
