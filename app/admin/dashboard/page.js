"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  BarChart2, Users, Package, ShoppingCart, DollarSign, TrendingUp,
  Calendar, Settings, LogOut, Menu, X, Search, Bell, MessageSquare,
  ChevronDown
} from 'lucide-react';
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dashboard Page: includes charts, stats and marketing/logistics insights.
const DashboardPage = () => {
  // Sample data for charts (monthly sales in Euros)
  const salesData = [
    { month: 'Jan', sales: 12800 },
    { month: 'Feb', sales: 14500 },
    { month: 'Mar', sales: 18200 },
    { month: 'Apr', sales: 17800 },
    { month: 'May', sales: 22400 },
    { month: 'Jun', sales: 25100 },
    { month: 'Jul', sales: 23800 },
    { month: 'Aug', sales: 24600 },
    { month: 'Sep', sales: 27500 },
    { month: 'Oct', sales: 29800 },
    { month: 'Nov', sales: 32100 },
    { month: 'Dec', sales: 36500 },
  ];

  // Updated product performance data
  const productPerformance = [
    { name: 'EnergyEssence (Star)', units: 620, revenue: 18600 },
    { name: 'ImmunoGuard (Q-Mark)', units: 480, revenue: 14400 },
    { name: 'VitalEssenz', units: 370, revenue: 11100 },
    { name: 'BrainBoost', units: 245, revenue: 7350 },
  ];
  const COLORS = ['#3B82F6', '#00C49F', '#FFBB28', '#FF8042'];

  // Recent orders
  const recentOrders = [
    { id: '#12345', customer: 'Anna Schmidt', product: 'EnergyEssence', price: '€29.99', status: 'Versendet' },
    { id: '#12346', customer: 'Max Müller', product: 'ImmunoGuard', price: '€34.99', status: 'In Bearbeitung' },
    { id: '#12347', customer: 'Lisa Weber', product: 'BrainBoost', price: '€49.99', status: 'Geliefert' },
    { id: '#12348', customer: 'Felix Braun', product: 'VitalEssenz', price: '€39.99', status: 'Versendet' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { icon: DollarSign, label: 'Gesamtumsatz', value: '€265,420', trend: '+12.5%' },
          { icon: ShoppingCart, label: 'Bestellungen', value: '1,745', trend: '+8.3%' },
          { icon: Users, label: 'Aktive Kunden', value: '3,967', trend: '+5.7%' },
          { icon: TrendingUp, label: 'Fortschritt zum 20%-Ziel', value: '12.8%', trend: '+2.4%' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon size={24} className="text-blue-600" />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Umsatzentwicklung (Monat)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance (Pie Chart) */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Produktumsätze</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productPerformance} dataKey="revenue" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Marketing Insights & BCG-Matrix</h3>
          <p className="text-gray-600 mb-3">
            <strong>EnergyEssence</strong> (Star): Hoher Marktanteil & hohes Wachstum. Ziel: Marktanteil sichern und Investitionen senken.
          </p>
          <p className="text-gray-600 mb-3">
            <strong>ImmunoGuard</strong> (Question Mark): Moderater Marktanteil mit Wachstumspotenzial. Ziel: Marktanteil ausbauen und Wettbewerbsposition durch verstärkte Marketingausgaben verbessern.
          </p>
          <p className="text-gray-600">
            Insgesamt streben wir eine Umsatzsteigerung um 20 % an und optimieren das Markenimage durch gezielte Marketingstrategien.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Logistik & Imageverbesserung</h3>
          <p className="text-gray-600 mb-3">
            Kundenfeedback zeigt, dass Lieferzeiten verkürzt und Versandkosten gesenkt werden müssen. Ziel: max. 2–3 Tage Lieferzeit und kostenlose Lieferung ab einem bestimmten Bestellwert.
          </p>
          <p className="text-gray-600">
            Durch optimierte Produktionsprozesse und verlässliche Partner wollen wir Engpässe vermeiden und eine nachhaltigere Verpackung einführen, um das Image zu stärken.
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">Letzte Bestellungen</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bestellnr.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kunde</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produkt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Versendet'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Geliefert'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Marketing Page: Highlights the marketing concept and strategies from the document.
const MarketingPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Marketingkonzept</h1>
    <p className="text-gray-600 mb-4">
      Unser Ziel ist es, den Umsatz um 20 % zu steigern und das Markenimage zu optimieren. Durch gezielte Marketinginstrumente und eine detaillierte Zielgruppenanalyse wollen wir VitalBoost langfristig als vertrauenswürdige Marke etablieren.
    </p>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">BCG-Matrix</h2>
    <ul className="list-disc list-inside mb-4 text-gray-600">
      <li>
        <strong>EnergyEssence (Star):</strong> Hoher Marktanteil & hohes Wachstum. Ziel: Marktanteil sichern, Investitionen senken und Gewinne steigern.
      </li>
      <li>
        <strong>ImmunoGuard (Question Mark):</strong> Moderater Marktanteil mit Wachstumspotenzial. Ziel: Marktanteil ausbauen und Wettbewerbsposition verbessern.
      </li>
    </ul>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Marketingstrategien</h2>
    <ul className="list-disc list-inside mb-4 text-gray-600">
      <li>Preisanpassung & Premium-Positionierung</li>
      <li>Gezielte Social-Media-Strategien (Instagram, TikTok)</li>
      <li>Influencer-Marketing und Kooperationen</li>
      <li>Content-Marketing zur Steigerung der Markenbekanntheit</li>
      <li>Gezielte Werbekampagnen und exklusive Angebote</li>
    </ul>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Zielgruppenanalyse</h2>
    <p className="text-gray-600">
      Unsere Zielgruppe umfasst gesundheitsbewusste, aktive Menschen zwischen 18 und 29 Jahren. Um ihre Bedürfnisse und Kaufgewohnheiten zu verstehen, nutzen wir Umfragen, Datenanalysen, Social Listening und Marktforschung.
    </p>
  </div>
);

// Production Page: Details about production and logistics improvements.
const ProductionPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Produktion & Logistik</h1>
    <p className="text-gray-600 mb-4">
      Um der steigenden Nachfrage gerecht zu werden, erhöhen wir kontinuierlich unsere Produktionskapazitäten. Optimierte Produktionsprozesse und verbesserte Lagerhaltung gewährleisten eine ständige Verfügbarkeit unserer Produkte.
    </p>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Maßnahmen zur Produktionssteigerung:</h2>
    <ul className="list-disc list-inside mb-4 text-gray-600">
      <li>Optimierung der Produktionsprozesse</li>
      <li>Erhöhung der Lagerkapazitäten zur Vermeidung von Engpässen</li>
      <li>Einführung neuer Produktvarianten zur Sortimentserweiterung</li>
      <li>Verbesserung der Logistik, um Lieferzeiten auf 2–3 Tage zu verkürzen</li>
      <li>Nachhaltigere Verpackungslösungen zur Imageverbesserung</li>
    </ul>
  </div>
);

// Feedback Page: Summarizes customer feedback and survey results.
const FeedbackPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Kundenfeedback & Umfragen</h1>
    <p className="text-gray-600 mb-4">
      Das Feedback unserer Kunden ist essenziell für die kontinuierliche Verbesserung unserer Produkte und Services. Regelmäßige Umfragen helfen uns, die Zufriedenheit zu messen und Optimierungspotenziale zu identifizieren.
    </p>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Kundenzufriedenheit</h2>
    <p className="text-gray-600 mb-4">
      Kunden loben insbesondere die schnelle Wirkung und natürliche Zusammensetzung unserer Produkte, wünschen sich jedoch mehr Geschmacksrichtungen, kleinere Packungsgrößen und nachhaltigere Verpackungen.
    </p>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Verbesserungsvorschläge</h2>
    <ul className="list-disc list-inside mb-4 text-gray-600">
      <li>Erweiterung des Produktportfolios (z.B. Produkte für besseren Schlaf oder Fitness)</li>
      <li>Optimierung der Verpackung hinsichtlich Nachhaltigkeit</li>
      <li>Verbesserung des Kundenservices und der Lieferzeiten</li>
    </ul>
  </div>
);

// Settings Page: Placeholder for admin settings.
const SettingsPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Einstellungen</h1>
    <p className="text-gray-600">Hier können Sie Ihre Systemeinstellungen und Unternehmensdaten anpassen.</p>
  </div>
);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Add renderPage function inside AdminDashboard component
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'marketing':
        return <MarketingPage />;
      case 'production':
        return <ProductionPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Suchen..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <MessageSquare size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
                <ChevronDown size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
