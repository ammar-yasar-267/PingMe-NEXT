'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}  from "../../../components/ui/table";
import { Search, Edit, Trash2, Plus } from 'lucide-react'

const mockBots = [
  { id: 1, name: 'ChatBot', creator: 'John Doe', status: 'Approved', createdAt: '2023-05-15' },
  { id: 2, name: 'HelperBot', creator: 'Jane Smith', status: 'Rejected', createdAt: '2023-06-01' },
  { id: 3, name: 'AssistantBot', creator: 'Bob Johnson', status: 'Pending', createdAt: '2023-06-10' },
]

export default function BotsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBots = mockBots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.creator.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-yellow-400">Manage Bots</h2>
        <Button className="bg-cyan-400 hover:bg-yellow-400 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Add Bot
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Creator</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Created At</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBots.map((bot) => (
                  <TableRow key={bot.id}>
                    <TableCell className="text-gray-300">{bot.name}</TableCell>
                    <TableCell className="text-gray-300">{bot.creator}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        bot.status === 'Approved' 
                          ? 'bg-green-500/20 text-green-400' 
                          : bot.status === 'Rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {bot.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">{bot.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-yellow-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

