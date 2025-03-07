"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { products, categories } from '@/data/products';
import { 
    Search, Plus, Edit2, Trash2, Filter, ChevronDown, 
    ArrowUp, ArrowDown, Package 
} from 'lucide-react';

const ProductsManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('products');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Update the products data to include stock information
    const productsWithStock = products.map(product => ({
        ...product,
        stock: product.stock || 0  // Add default stock if not present
    }));

    const filteredAndSortedProducts = productsWithStock
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            if (sortBy === 'name') return a.name.localeCompare(b.name) * order;
            if (sortBy === 'price') return (a.price - b.price) * order;
            if (sortBy === 'stock') return (a.stock - b.stock) * order;
            return 0;
        });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            <AdminSidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentPage={currentPage}
            />

            <main className="flex-1 w-full lg:overflow-auto">
                <div className="p-4 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Produkte verwalten</h1>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                            <Plus size={20} />
                            Neues Produkt
                        </button>
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
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
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'Alle Kategorien' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-sm text-gray-600">
                                {filteredAndSortedProducts.length} Produkte gefunden
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left">
                                                <button 
                                                    onClick={() => handleSort('name')}
                                                    className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Produkt
                                                    {sortBy === 'name' && (
                                                        sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategorie</th>
                                            <th className="px-6 py-3 text-left">
                                                <button 
                                                    onClick={() => handleSort('price')}
                                                    className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Preis
                                                    {sortBy === 'price' && (
                                                        sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-6 py-3 text-left">
                                                <button 
                                                    onClick={() => handleSort('stock')}
                                                    className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Lagerbestand
                                                    {sortBy === 'stock' && (
                                                        sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredAndSortedProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img 
                                                            src={product.image} 
                                                            alt={product.name} 
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{product.name}</div>
                                                            <div className="text-sm text-gray-500">{product.description.slice(0, 50)}...</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs capitalize">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-900">€{product.price.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs ${
                                                        product.stock > 20 
                                                            ? 'bg-green-100 text-green-800'
                                                            : product.stock > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {product.stock} verfügbar
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs ${
                                                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {product.stock > 0 ? 'Aktiv' : 'Inaktiv'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-3">
                                                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductsManagement;
