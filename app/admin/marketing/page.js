"use client";
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  Menu, X, Search, Bell, MessageSquare, ChevronDown,
  Users, TrendingUp, DollarSign, ShoppingCart, Package, BarChart2, Calendar, Settings, LogOut, Instagram, Twitter, Facebook
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const MarketingDashboard = () => {
  // Sidebar state and navigation
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('marketing'); // default active page is Marketing

  // State for interactive tabs on the Marketing page content
  const [activeTab, setActiveTab] = useState('konzept');

  // State for campaign form
  const [campaignName, setCampaignName] = useState("");
  const [campaignBudget, setCampaignBudget] = useState("");
  const [campaignPlatform, setCampaignPlatform] = useState("instagram");
  const [campaignStart, setCampaignStart] = useState("");
  const [campaignEnd, setCampaignEnd] = useState("");
  const [campaigns, setCampaigns] = useState([
    { name: "Frühlingsaktion", budget: "€2,500", platform: "instagram", start: "2025-03-01", end: "2025-03-31" },
    { name: "Produkt-Launch ImmunoGuard Plus", budget: "€4,200", platform: "facebook", start: "2025-02-01", end: "2025-02-28" },
    { name: "Winter-Sale", budget: "€1,800", platform: "twitter", start: "2025-01-10", end: "2025-01-25" }
  ]);

  // Marketing stats (derived from the document and as placeholders)
  const marketingStats = [
    { icon: Users, label: 'Follower-Gesamt', value: '12,340', trend: '+3.2%' },
    { icon: TrendingUp, label: 'Engagement-Rate', value: '5.7%', trend: '+1.1%' },
    { icon: DollarSign, label: 'Ad Budget', value: '€5,400', trend: '-2.4%' },
    { icon: ShoppingCart, label: 'Konversionsrate', value: '9.2%', trend: '+0.8%' },
  ];

  // Monthly ad spend data for the bar chart
  const adSpendData = [
    { month: 'Jan', facebook: 1200, instagram: 1800, twitter: 600 },
    { month: 'Feb', facebook: 1400, instagram: 2000, twitter: 700 },
    { month: 'Mar', facebook: 1100, instagram: 2200, twitter: 800 },
    { month: 'Apr', facebook: 1300, instagram: 2100, twitter: 750 },
    { month: 'Mai', facebook: 1500, instagram: 2300, twitter: 900 },
    { month: 'Jun', facebook: 1700, instagram: 2500, twitter: 950 },
  ];

  // ROI data for products (from document)
  const roiData = [
    { name: 'EnergyEssence', value: 65 },
    { name: 'ImmunoGuard', value: 42 },
    { name: 'VitalEssenz', value: 38 },
    { name: 'BrainBoost', value: 25 },
  ];

  // Colors for charts
  const COLORS = ['#3B82F6', '#00C49F', '#FFBB28', '#FF8042'];

  // For campaign platform icons
  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'instagram': return <Instagram size={16} className="text-pink-500" />;
      case 'facebook': return <Facebook size={16} className="text-blue-600" />;
      case 'twitter': return <Twitter size={16} className="text-blue-400" />;
      default: return <Instagram size={16} className="text-pink-500" />;
    }
  };

  // Handle campaign form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (campaignName && campaignBudget && campaignStart && campaignEnd) {
      setCampaigns([
        { 
          name: campaignName, 
          budget: `€${campaignBudget}`, 
          platform: campaignPlatform,
          start: campaignStart, 
          end: campaignEnd 
        },
        ...campaigns
      ]);
      // Reset form fields
      setCampaignName("");
      setCampaignBudget("");
      setCampaignStart("");
      setCampaignEnd("");
    }
  };

  // Interactive tabs content, derived from the provided document data
  const tabs = [
    {
      id: 'konzept',
      label: 'Marketingkonzept',
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Marketingkonzept</h2>
          <p className="text-gray-600">
            Unser Ziel ist es, den Umsatz um 20 % zu steigern und das Markenimage zu optimieren. 
            Durch gezielte Marketinginstrumente und eine detaillierte Zielgruppenanalyse wollen wir VitalBoost 
            langfristig als vertrauenswürdige Marke etablieren.
          </p>
        </div>
      ),
    },
    {
      id: 'bcg',
      label: 'BCG-Matrix',
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">BCG-Matrix</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>EnergyEssence (Star):</strong> Hoher Marktanteil & hohes Wachstum. 
              Ziel: Marktanteil sichern, Investitionen senken und Gewinne steigern.
            </li>
            <li>
              <strong>ImmunoGuard (Question Mark):</strong> Moderater Marktanteil mit Wachstumspotenzial. 
              Ziel: Marktanteil ausbauen und Wettbewerbsposition verbessern.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'strategien',
      label: 'Marketingstrategien',
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Marketingstrategien</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Preisanpassung & Premium-Positionierung</li>
            <li>Gezielte Social-Media-Strategien (Instagram, TikTok)</li>
            <li>Influencer-Marketing und Kooperationen</li>
            <li>Content-Marketing zur Steigerung der Markenbekanntheit</li>
            <li>Gezielte Werbekampagnen und exklusive Angebote</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'zielgruppe',
      label: 'Zielgruppenanalyse',
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Zielgruppenanalyse</h2>
          <p className="text-gray-600">
            Unsere Zielgruppe umfasst gesundheitsbewusste, aktive Menschen zwischen 18 und 29 Jahren. 
            Um ihre Bedürfnisse und Kaufgewohnheiten zu verstehen, nutzen wir Umfragen, Datenanalysen, 
            Social Listening und Marktforschung.
          </p>
        </div>
      ),
    },
    {
      id: 'kampagnen',
      label: 'Kampagnen & Slogans',
      content: (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Kampagnen & Slogans</h2>
          <p className="text-gray-600 mb-2">Beispiele für Slogans:</p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>"Jetzt Vitalboost holen und den Alltag verbessern, der Link ist in der Bio"</li>
            <li>"Vitalboost für den Natürlichen Kick"</li>
            <li>"Egal zu welchem Tag – Vitalboost schickt dich zu stärkeren Mannschaften"</li>
            <li>"Hol dir jetzt Vitalboost und bring deinen Alltag auf das nächste Level, Link in der Bio"</li>
          </ul>
          <p className="text-gray-600">
            Hashtags: <span className="font-semibold">#StressfreiMitVitalboost</span>, <span className="font-semibold">#Mehrfokus</span>, <span className="font-semibold">#Jugendlichepower</span>, <span className="font-semibold">#KonzentrationSteigern</span>
          </p>
        </div>
      ),
    },
  ];

  // Sidebar navigation items (similar to the main dashboard)
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp },
    { id: 'production', label: 'Produktion', icon: Package },
    { id: 'feedback', label: 'Feedback', icon: Users },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
  ];

  // Render content based on current page (only "marketing" is implemented here)
  const renderPage = () => {
    switch (currentPage) {
      case 'marketing':
        return (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {marketingStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <stat.icon size={24} className="text-blue-600" />
                    </div>
                    <span className={`${stat.trend.startsWith('-') ? 'text-red-500' : 'text-green-500'} text-sm font-medium`}>
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm mb-1">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Ad Spend Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Werbeausgaben pro Plattform</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adSpendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="facebook" name="Facebook" fill="#4267B2" />
                    <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
                    <Bar dataKey="twitter" name="Twitter" fill="#1DA1F2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ROI Pie Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Marketing ROI nach Produkt (%)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={roiData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {roiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Interactive Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 text-lg font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Render active tab content */}
            {tabs.find((tab) => tab.id === activeTab)?.content}

            {/* New Campaign Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Neue Kampagne erstellen</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Kampagnenname</label>
                  <input 
                    type="text" 
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Name der Kampagne"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Budget (€)</label>
                  <input 
                    type="number" 
                    value={campaignBudget}
                    onChange={(e) => setCampaignBudget(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">Plattform</label>
                  <select 
                    value={campaignPlatform}
                    onChange={(e) => setCampaignPlatform(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Startdatum</label>
                    <input 
                      type="date" 
                      value={campaignStart}
                      onChange={(e) => setCampaignStart(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">Enddatum</label>
                    <input 
                      type="date" 
                      value={campaignEnd}
                      onChange={(e) => setCampaignEnd(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Kampagne erstellen
                </button>
              </form>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">Aktuelle Marketingkampagnen</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kampagne</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plattform</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zeitraum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {campaigns.map((campaign, index) => {
                      const startDate = new Date(campaign.start);
                      const endDate = new Date(campaign.end);
                      const today = new Date();
                      let status = "Geplant";
                      if (today > endDate) status = "Abgeschlossen";
                      else if (today >= startDate) status = "Aktiv";
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.budget}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center">
                              {getPlatformIcon(campaign.platform)}
                              <span className="ml-2">
                                {campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(campaign.start).toLocaleDateString('de-DE')} - {new Date(campaign.end).toLocaleDateString('de-DE')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              status === 'Aktiv'
                                ? 'bg-green-100 text-green-800'
                                : status === 'Abgeschlossen'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Audience & Sales Target */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Zielgruppenanalyse</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-600">Alter</div>
                    <div className="w-2/3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>18-29 Jahre (65%)</span>
                        <span>30-45 Jahre (35%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-600">Geschlecht</div>
                    <div className="w-2/3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-400 h-2 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Weiblich (55%)</span>
                        <span>Männlich (45%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-600">Interessen</div>
                    <div className="w-2/3">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-1/2">Fitness & Gesundheit</span>
                          <div className="w-1/2 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-1/2">Nachhaltigkeit</span>
                          <div className="w-1/2 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 w-1/2">Self-Care</span>
                          <div className="w-1/2 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Umsatzziel 2025: +20%</h2>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Fortschritt</span>
                    <span className="text-sm font-medium text-blue-600">12.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Maßnahmen zur Zielerreichung</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" checked readOnly />
                    <span className="text-gray-600">Produktportfolio erweitern</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" checked readOnly />
                    <span className="text-gray-600">Influencer-Programm ausbauen</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Versandkosten optimieren</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Nachhaltigere Verpackung einführen</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Internationale Märkte erschließen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Willkommen im Marketing Dashboard</h1>
            <p className="text-gray-600">Wählen Sie eine Option aus dem Menü.</p>
          </div>
        );
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

export default MarketingDashboard;
