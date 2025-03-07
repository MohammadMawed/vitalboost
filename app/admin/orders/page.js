"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { 
    Search, FileText, TrendingUp, Package, Truck, CheckCircle, 
    AlertCircle, Calendar, Download, Filter
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const OrdersPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('orders');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample sales data
    const salesData = [
        { month: 'Jan', sales: 42000, target: 50400 },
        { month: 'Feb', sales: 44500, target: 53400 },
        { month: 'Mar', sales: 48000, target: 57600 },
        { month: 'Apr', sales: 46500, target: 55800 },
        { month: 'Mai', sales: 52000, target: 62400 },
        { month: 'Jun', sales: 54500, target: 65400 },
    ];

    // Sample orders data
    const orders = [
        { 
            id: "ORD-2025-001",
            customer: "Anna Schmidt",
            date: "2025-02-15",
            amount: "€149.97",
            items: 3,
            status: "completed",
            products: ["VitalEssenz Plus", "ImmunoGuard Pro", "OmegaForce"]
        },
        // ... more orders
    ];

    const orderStatuses = {
        pending: { label: "Ausstehend", color: "bg-yellow-100 text-yellow-800" },
        processing: { label: "In Bearbeitung", color: "bg-blue-100 text-blue-800" },
        shipped: { label: "Versendet", color: "bg-purple-100 text-purple-800" },
        completed: { label: "Abgeschlossen", color: "bg-green-100 text-green-800" },
        cancelled: { label: "Storniert", color: "bg-red-100 text-red-800" }
    };

    // Calculate current growth percentage
    const calculateGrowth = () => {
        const currentSales = salesData.reduce((sum, month) => sum + month.sales, 0);
        const targetSales = salesData.reduce((sum, month) => sum + month.target, 0);
        return ((currentSales / targetSales) * 100).toFixed(1);
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
                    {/* Sales Goal Progress */}
                    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Umsatzziel: +20% Wachstum</h2>
                            <span className="text-sm text-gray-500">2025</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Aktueller Fortschritt</span>
                                <span className="text-sm font-medium text-blue-600">{calculateGrowth()}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${calculateGrowth()}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="sales" 
                                            stroke="#2563EB" 
                                            name="Aktueller Umsatz"
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="target" 
                                            stroke="#9333EA" 
                                            strokeDasharray="5 5" 
                                            name="Zielumsatz (+20%)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Orders Management Section */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 lg:p-6 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                <h2 className="text-xl font-bold text-gray-800">Bestellungen</h2>
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Bestellung suchen..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Alle Status</option>
                                        {Object.entries(orderStatuses).map(([key, { label }]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                        <Download size={20} />
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bestellung</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kunde</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Betrag</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {new Date(order.date).toLocaleDateString('de-DE')}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{order.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${orderStatuses[order.status].color}`}>
                                                        {orderStatuses[order.status].label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        Details
                                                    </button>
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

export default OrdersPage;
