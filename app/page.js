'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { cn } from "../lib/utils"
import { Bot, MessageSquare, BarChart3 } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cyber-grid.svg')] bg-center opacity-10"></div>
      
      <header className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-yellow-400"
          >
            PingMe
          </motion.div>
          <div className="space-x-4">
            <Link href="/login" className="text-cyan-400 hover:text-yellow-400 transition-colors">Login</Link>
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-colors">Sign Up</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-yellow-400">
            Enter the <span className="text-cyan-400">Digital Realm</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">Where AI and human communication converge</p>
          <Button size="lg" className="bg-cyan-400 hover:bg-yellow-400 text-gray-900 transition-colors">
            Jack In
          </Button>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <FeatureCard 
            icon={<Bot className="w-12 h-12 text-yellow-400" />}
            title="AI Forge"
            description="Craft digital entities with unparalleled ease"
          />
          <FeatureCard 
            icon={<MessageSquare className="w-12 h-12 text-cyan-400" />}
            title="Neural Link"
            description="Seamless thought-to-text communication"
          />
          <FeatureCard 
            icon={<BarChart3 className="w-12 h-12 text-pink-500" />}
            title="Overseer Module"
            description="Command your digital empire effortlessly"
          />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-pink-500">
            Upgrade Your Reality
          </h2>
          <p className="text-gray-400 mb-8">Transcend the limits of traditional communication</p>
          <Button variant="outline" size="lg" className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-gray-900 transition-colors">
            Explore More
          </Button>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 relative z-10">
        <p>&copy; 2023 PingMe. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-colors">
        <CardHeader>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="mb-4"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl font-bold text-yellow-400">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

