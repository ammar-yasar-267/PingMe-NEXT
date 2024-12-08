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
} from "../../../components/ui/table"
import { Search, Eye, Trash2 } from 'lucide-react'

const mockChatRooms = [
  { id: 1, name: 'General Chat', participants: 15, messages: 150, lastActive: '2023-06-15 14:30' },
  { id: 2, name: 'Tech Support', participants: 8, messages: 75, lastActive: '2023-06-15 13:45' },
  { id: 3, name: 'Random Topics', participants: 20, messages: 200, lastActive: '2023-06-15 15:00' },
]

export default function ChatRoomsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredChatRooms = mockChatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-yellow-400">Chat Rooms</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search chat rooms..."
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
                  <TableHead className="text-gray-400">Participants</TableHead>
                  <TableHead className="text-gray-400">Messages</TableHead>
                  <TableHead className="text-gray-400">Last Active</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChatRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="text-gray-300">{room.name}</TableCell>
                    <TableCell className="text-gray-300">{room.participants}</TableCell>
                    <TableCell className="text-gray-300">{room.messages}</TableCell>
                    <TableCell className="text-gray-300">{room.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-yellow-400">
                          <Eye className="h-4 w-4" />
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

