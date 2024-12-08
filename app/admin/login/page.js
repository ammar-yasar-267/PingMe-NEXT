'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Bot } from 'lucide-react'

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/cyber-grid.svg')] bg-center opacity-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Bot className="w-12 h-12 text-yellow-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-yellow-400">
              {isLogin ? 'Admin Login' : 'Admin Sign Up'}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              {isLogin ? 'Access your admin dashboard' : 'Create a new admin account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="email" placeholder="Email" className="bg-gray-700 border-gray-600 text-cyan-400" />
              <Input type="password" placeholder="Password" className="bg-gray-700 border-gray-600 text-cyan-400" />
              {!isLogin && (
                <Input type="password" placeholder="Confirm Password" className="bg-gray-700 border-gray-600 text-cyan-400" />
              )}
              <Button className="w-full bg-cyan-400 hover:bg-yellow-400 text-gray-900 transition-colors">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="link" className="text-cyan-400" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

