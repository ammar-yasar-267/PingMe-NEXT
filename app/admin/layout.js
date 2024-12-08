'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../../components/ui/button"
import { Menu, X, Users, Bot, BarChart2, UserPlus, MessageSquare, Settings, Activity } from 'lucide-react'

const sidebarItems = [
  { icon: BarChart2, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Manage Users', href: '/admin/users' },
  { icon: Bot, label: 'Manage Bots', href: '/admin/bots' },
  { icon: MessageSquare, label: 'Chat Rooms', href: '/admin/chat-rooms' },
  { icon: Activity, label: 'Analytics', href: '/admin/analytics' },
  { icon: UserPlus, label: 'Add Admin', href: '/admin/add-admin' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 overflow-hidden flex">
      <div className="fixed inset-0 bg-[url('/cyber-grid.svg')] bg-center opacity-10 pointer-events-none"></div>
      
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800 w-64 min-h-screen p-4 fixed left-0 top-0 z-50 md:relative"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav>
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <motion.li key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href={item.href} className={`flex items-center p-2 rounded-lg transition-colors ${
                      pathname === item.href ? 'bg-cyan-400 text-gray-900' : 'hover:bg-gray-700'
                    }`}>
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-yellow-400">PingMe Admin</h1>
          <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900">
            Logout
          </Button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
