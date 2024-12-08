'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch"
import { Save } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'PingMe',
    siteDescription: 'Where AI and human communication converge',
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic to save settings
    console.log('Updated settings:', settings)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-yellow-400">Settings</h2>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-yellow-400">General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-gray-400">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription" className="text-gray-400">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableRegistration" className="text-gray-400">Enable Registration</Label>
              <Switch
                id="enableRegistration"
                checked={settings.enableRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableNotifications" className="text-gray-400">Enable Notifications</Label>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode" className="text-gray-400">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
            <Button type="submit" className="w-full bg-cyan-400 hover:bg-yellow-400 text-gray-900">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

