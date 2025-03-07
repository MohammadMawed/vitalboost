"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; // Add this import for the Link component
import { ChevronLeft, Star, ShoppingCart, Heart, Share2, ArrowLeft, ArrowRight } from 'lucide-react';

// Move products data outside component
const productsData = [
  {
    id: 1,
    name: "VitalEssenz Plus",
    description: "Premium Vitamin-Komplex für gesteigerte Energie",
    longDescription: "VitalEssenz Plus ist ein Premium-Nahrungsergänzungsmittel, das speziell entwickelt wurde, um Ihre Energie und mentale Leistungsfähigkeit zu steigern. Unsere einzigartige Formel basiert auf wissenschaftlich geprüften Inhaltsstoffen höchster Qualität.",
    price: 39.99,
    discountPrice: 34.99,
    category: "vitamine",
    images: ["/images/vitamin.png", "/images/vitamin.png", "/images/vitamin.png"],
    stock: 15,
    rating: 4.8,
    reviews: 24,
    ingredients: "Premium Vitamin-Komplex, Mineralstoffe, Spurenelemente",
    usage: "Täglich eine Kapsel mit ausreichend Wasser einnehmen"
  },
  {
    id: 2,
    name: "ImmunoGuard Pro",
    description: "Hochdosierter Immun-Booster mit Zink",
    longDescription: "ImmunoGuard Pro ist unsere fortschrittliche Formulierung zur Unterstützung des Immunsystems.",
    price: 44.99,
    discountPrice: 44.99,
    category: "immunsystem",
    images: ["/images/boost.png", "/images/boost.png", "/images/boost.png"],
    stock: 20,
    rating: 4.9,
    reviews: 18,
    ingredients: "Zink, Vitamin C, Echinacea, Beta-Glucane",
    usage: "Eine Kapsel täglich zum Essen einnehmen"
  },
  {
    id: 3,
    name: "OmegaForce",
    description: "Hochwertige Omega-3 Fettsäuren",
    price: 29.99,
    category: "herz",
    images: ["/images/omega3.png"],
    stock: 25,
    rating: 4.7,
    reviews: 15
  },
  {
    id: 4,
    name: "MagnesiumPlus",
    description: "Magnesium für Muskeln und Nerven",
    price: 24.99,
    category: "mineralstoffe",
    images: ["/images/magnesium.png"],
    stock: 30,
    rating: 4.6,
    reviews: 12
  },
  {
    id: 5,
    name: "SleepWell",
    description: "Natürlicher Schlaf-Optimierer",
    price: 34.99,
    category: "schlaf",
    images: ["/images/sleep.png"],
    stock: 18,
    rating: 4.9,
    reviews: 20
  },
  {
    id: 11,
    name: "PowerProtein Plus",
    description: "Premium Protein-Shake mit essentiellen Aminosäuren",
    longDescription: "PowerProtein Plus ist unsere fortschrittliche Proteinformel, die speziell für aktive Menschen und Sportler entwickelt wurde. Mit einem optimalen Verhältnis von schnell und langsam verdaulichen Proteinen unterstützt es den Muskelaufbau und die Regeneration. Die Formel enthält zusätzlich einen BCAA-Komplex und wichtige Vitamine für maximale Ergebnisse.",
    price: 49.99,
    discountPrice: 49.99,
    category: "sport",
    images: ["/images/protein.png", "/images/protein.png", "/images/protein.png"],
    stock: 45,
    rating: 4.9,
    reviews: 156,
    ingredients: "Molkenprotein-Isolat (75%), Molkenprotein-Konzentrat (20%), BCAA-Komplex (3%), Vitaminkomplex (2%), natürliche Aromen",
    usage: "Mischen Sie einen Messlöffel (30g) mit 300ml kaltem Wasser oder Milch. Nehmen Sie 1-2 Portionen täglich, idealerweise nach dem Training oder zwischen den Mahlzeiten."
  }
];

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);
      try {
        const foundProduct = productsData.find(p => p.id === Number(params.id));
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const getRelatedProducts = (currentProduct) => {
    return productsData
      .filter(p => p.id !== currentProduct.id) // Exclude current product
      .sort(() => 0.5 - Math.random()) // Randomize order
      .slice(0, 4); // Get first 4 products
  };

  const RelatedProducts = () => (
    <div className="mt-16">
      <h2 className="text-2xl text-black font-bold mb-8">Das könnte Ihnen auch gefallen</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {getRelatedProducts(product).map((relatedProduct) => (
          <div 
            key={relatedProduct.id} 
            onClick={() => window.location.href = `/${relatedProduct.id}`}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative h-48">
              <img 
                src={relatedProduct.images && relatedProduct.images.length > 0 
                  ? relatedProduct.images[0] 
                  : "/images/placeholder.png"}
                alt={relatedProduct.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 text-gray-900">{relatedProduct.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedProduct.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">€{relatedProduct.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produkt nicht gefunden</h2>
          <p className="text-gray-600 mb-4">Das gesuchte Produkt existiert leider nicht.</p>
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  }

  const tabLabels = {
    description: "Beschreibung",
    ingredients: "Inhaltsstoffe",
    usage: "Anwendung",
    reviews: "Bewertungen"
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Responsive Header with consistent styling */}
      <header className="nav-blue sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors">
              <ChevronLeft className="h-5 w-5" />
              <span className="text-lg hidden sm:inline">Zurück zur Übersicht</span>
            </a>
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-white">
                VitalBoost
              </span>
            </Link>
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-white hover:text-white/90 transition-colors cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <div className="bg-white rounded-2xl overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:space-x-12 p-4 lg:p-8">
            {/* Product Images */}
            <div className="lg:w-1/2 space-y-4 lg:space-y-6">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                {/* Fallback content */}
                <div className="empty-image-placeholder">
                  <span>Produktbild</span>
                </div>
                
                {product.images && product.images.length > 0 && (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="mobile-image-fix safari-image-fix absolute inset-0"
                    loading="eager" 
                    fetchPriority="high"
                    width="400"
                    height="400"
                    style={{objectFit: "contain"}}
                    onError={(e) => {
                      console.log('Image error:', e);
                      e.target.onerror = null;
                      e.target.style.display = 'none'; 
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    className="p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => setSelectedImage(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    className="p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail gallery */}
              <div className="grid grid-cols-3 gap-4">
                {product.images && product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    {/* Thumbnail fallback */}
                    <div className="empty-image-placeholder">
                      <span>Bild</span>
                    </div>
                    
                    <img 
                      src={image} 
                      alt="" 
                      className="mobile-image-fix safari-image-fix absolute inset-0"
                      loading="lazy"
                      width="100"
                      height="100"
                      style={{objectFit: "cover"}}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.src = "/images/placeholder.png";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5"
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">{product.rating} ({product.reviews} Bewertungen)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.discountPrice && product.discountPrice < product.price && (
                        <>
                          <span className="text-xl text-gray-400">×</span>
                          <span className="text-3xl font-bold text-blue-600">
                            €{product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            ({((product.price - product.discountPrice) / product.price * 100).toFixed(0)}% Rabatt)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 20 
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 20 
                        ? `${product.stock} auf Lager` 
                        : product.stock > 0
                        ? `Nur noch ${product.stock} verfügbar`
                        : 'Nicht verfügbar'}
                    </span>
                    {product.stock <= 20 && product.stock > 0 && (
                      <span className="text-sm text-red-600 font-medium">
                        Schnell zugreifen!
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {/* Elegant Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-black">Menge</label>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={decreaseQuantity}
                      className="w-10 h-10 rounded-full text-black border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 text-center border-b-2 text-black border-gray-200 focus:border-blue-600 focus:outline-none"
                    />
                    <button 
                      onClick={increaseQuantity}
                      className="w-10 h-10 rounded-full text-black border border-gray-300 flex items-center justify-center hover:border-blue-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>In den Warenkorb</span>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors" title="Zur Wunschliste hinzufügen">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors" title="Teilen">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 mt-8 lg:mt-12">
            <div className="flex overflow-x-auto hide-scrollbar">
              {Object.entries(tabLabels).map(([key, label]) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === key 
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Enhanced Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Produktbeschreibung</h3>
                  <p className="text-gray-600">{product.longDescription}</p>
                  <p className="text-gray-600 mt-4">
                    Unser EnergyEssence Nahrungsergänzungsmittel verfügt über einen einzigartigen, innovativen Wirkstoffkomplex, der bei keinem Wettbewerber verfügbar ist.
                  </p>
                </div>
              )}
              
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Inhaltsstoffe</h3>
                  <p className="text-gray-600">{product.ingredients}</p>
                </div>
              )}
              
              {activeTab === 'usage' && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Empfohlene Anwendung</h3>
                  <p className="text-gray-600">{product.usage}</p>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Kundenbewertungen</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4" fill="currentColor" />
                        ))}
                      </div>
                      <span className="ml-2 font-medium text-gray-900">Ausgezeichnetes Produkt!</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Dieses Produkt hat meine Konzentration und Produktivität bei der Arbeit deutlich verbessert. Sehr zu empfehlen!
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Von Anna K. am 15. Januar 2025</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4" fill="currentColor" />
                        ))}
                        <Star className="h-4 w-4" />
                      </div>
                      <span className="ml-2 font-medium text-gray-900">Gute Qualität</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Ich habe eine verbesserte Konzentration bemerkt, seit ich dieses Nahrungsergänzungsmittel nehme. Der einzige Nachteil ist der Geschmack.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Von Markus S. am 2. Februar 2025</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8 lg:mt-16">
          <h2 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8">
            Das könnte Ihnen auch gefallen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getRelatedProducts(product).map((relatedProduct) => (
              <div 
                key={relatedProduct.id} 
                onClick={() => window.location.href = `/${relatedProduct.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full product-card-mobile"
              >
                <div className="product-image-mobile bg-gray-50 relative">
                  {/* Fallback content */}
                  <div className="empty-image-placeholder">
                    <span>Produktbild</span>
                  </div>
                  
                  <img 
                    src={relatedProduct.images && relatedProduct.images.length > 0 
                      ? relatedProduct.images[0] 
                      : "/images/placeholder.png"}
                    alt={relatedProduct.name}
                    className="mobile-image-fix safari-image-fix absolute inset-0"
                    loading="lazy"
                    width="200"
                    height="200"
                    style={{objectFit: "contain"}}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium mb-2 text-gray-900">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{relatedProduct.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-blue-600">€{relatedProduct.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }} 
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
