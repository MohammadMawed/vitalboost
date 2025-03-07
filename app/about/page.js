"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Award, Leaf, ChevronRight, ShoppingCart, Menu, X, LogIn } from 'lucide-react';

export default function AboutPage() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update the Header component for blue color scheme
    const Header = () => (
        <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'nav-blue' : 'nav-blue-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                            VitalBoost
                        </span>
                    </Link>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium">Startseite</Link>
                        <Link href="/products" className="text-white/90 hover:text-white transition-colors font-medium">Produkte</Link>
                        <Link href="/about" className="text-white font-medium">Über Uns</Link>
                        <Link href="/contact" className="text-white/90 hover:text-white transition-colors font-medium">Kontakt</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="hidden md:flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium">
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-blue-700/50 text-white">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            <div 
                className={`md:hidden absolute left-0 right-0 top-full bg-blue-800 border-t border-blue-700 shadow-lg transform transition-all duration-300 z-40 ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                }`}
            >
                <nav className="flex flex-col">
                    <Link href="/" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Startseite</Link>
                    <Link href="/products" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Produkte</Link>
                    <Link href="/about" className="px-4 py-3 text-white bg-blue-700/60">Über Uns</Link>
                    <Link href="/contact" className="px-4 py-3 text-white/90 hover:bg-blue-700 hover:text-white">Kontakt</Link>
                    <Link href="/login" className="px-4 py-3 text-white font-medium hover:bg-blue-700 flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        <span>Login</span>
                    </Link>
                </nav>
            </div>
        </header>
    );

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
            {/* Hero Section with padding for fixed navbar */}
            <section className="relative h-screen pt-16 md:pt-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/90 z-10"></div>
                <video 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute w-full h-full object-cover"
                >
                    <source src="/videos/health-bg.mp4" type="video/mp4" />
                </video>
                <div className="container mx-auto px-4 relative z-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Ihre Gesundheit.<br />Unsere Leidenschaft.
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Die VitalBoost GmbH ist ein mittelständisches Unternehmen in Zweibrücken, 
                        Rheinland-Pfalz, das eigene Nahrungsergänzungsmittel herstellt und diese 
                        lokal sowie online vertreibt.
                    </p>
                </div>
            </section>

            {/* Company Vision Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Unsere Vision</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Wir streben danach, ein führendes E-Commerce-Unternehmen im Bereich 
                            Nahrungsergänzungsmittel zu werden. Durch digitale Innovation und 
                            höchste Qualitätsstandards möchten wir uns langfristig als 
                            vertrauenswürdige Marke etablieren.
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Showcase Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Unsere Kernprodukte</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">EnergyEssence</h3>
                            <p className="text-gray-600">
                                Speziell entwickelt zur Steigerung der Konzentrations- und 
                                Leistungsfähigkeit. Ein Premium-Produkt für Menschen, die in ihrem 
                                Alltag Höchstleistungen erbringen müssen.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">ImmunoGuard</h3>
                            <p className="text-gray-600">
                                Unsere innovative Formulierung zur Stärkung des Immunsystems. 
                                Wissenschaftlich entwickelt und getestet für optimale Wirksamkeit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Premium Qualität",
                                description: "Wissenschaftlich geprüfte Inhaltsstoffe höchster Güte."
                            },
                            {
                                icon: Leaf,
                                title: "100% Natürlich",
                                description: "Nachhaltige Produktion und umweltfreundliche Verpackung."
                            },
                            {
                                icon: Award,
                                title: "Zertifiziert",
                                description: "ISO 9001:2015 zertifizierte Herstellungsprozesse."
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Promise Section */}
            <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Unser Qualitätsversprechen</h2>
                    <p className="text-xl max-w-3xl mx-auto mb-8">
                        Wir verwenden ausschließlich hochwertige, wissenschaftlich geprüfte 
                        Inhaltsstoffe und setzen auf modernste Produktionsverfahren. Unsere 
                        Produkte werden regelmäßig von unabhängigen Laboren getestet, um höchste 
                        Qualitätsstandards zu gewährleisten.
                    </p>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                    >
                        Produkte entdecken
                        <ChevronRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Entdecken Sie unsere Produkte
                    </h2>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                    >
                        Zum Shop
                        <ChevronRight className="ml-2 h-6 w-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
