'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Bot, Users, MessageSquare } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically load Recharts components for client-side rendering
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });

const data = [
  { name: 'Jan', bots: 4000, users: 2400, chatRooms: 2400 },
  { name: 'Feb', bots: 3000, users: 1398, chatRooms: 2210 },
  { name: 'Mar', bots: 2000, users: 9800, chatRooms: 2290 },
  { name: 'Apr', bots: 2780, users: 3908, chatRooms: 2000 },
  { name: 'May', bots: 1890, users: 4800, chatRooms: 2181 },
  { name: 'Jun', bots: 2390, users: 3800, chatRooms: 2500 },
  { name: 'Jul', bots: 3490, users: 4300, chatRooms: 2100 },
];

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-yellow-400">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Bot} title="Total Bots" value="1,234" />
        <StatCard icon={Users} title="Total Users" value="5,678" />
        <StatCard icon={MessageSquare} title="Active Chat Rooms" value="42" />
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-yellow-400">Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Line type="monotone" dataKey="bots" stroke="#22D3EE" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="chatRooms" stroke="#EC4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
          <Icon className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
