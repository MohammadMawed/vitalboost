import { 
  BarChart2, Users, Package, ShoppingCart, Settings, 
  LogOut, Menu, X, TrendingUp, MessageSquare, Inbox
} from 'lucide-react';
import Link from 'next/link';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, currentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2, href: '/admin/dashboard' },
    { id: 'marketing', label: 'Marketing', icon: TrendingUp, href: '/admin/marketing' },
    { id: 'products', label: 'Produkte', icon: Package, href: '/admin/products' },
    { id: 'orders', label: 'Bestellungen', icon: ShoppingCart, href: '/admin/orders' },
    { id: 'customers', label: 'Kunden', icon: Users, href: '/admin/customers' },
    { id: 'messages', label: 'Nachrichten', icon: MessageSquare, href: '/admin/messages' },
    { id: 'inbox', label: 'Posteingang', icon: Inbox, href: '/admin/inbox' },
    { id: 'settings', label: 'Einstellungen', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay with proper z-index */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
        transition-all duration-300 transform
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        lg:relative lg:transform-none
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <span className="text-xl font-bold text-blue-600">VitalBoost</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4">
          <Link
            href="/logout"
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Abmelden</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
