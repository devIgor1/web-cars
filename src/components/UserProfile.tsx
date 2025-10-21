import { useAuth } from '../contexts/AuthContext'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Mail, Phone, Calendar, Shield } from 'lucide-react'

export function UserProfile() {
  const { userData, logout } = useAuth()

  if (!userData) {
    return null
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">
            {userData.firstName[0]}{userData.lastName[0]}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{userData.displayName}</h2>
        <p className="text-gray-600 capitalize">{userData.role}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">{userData.email}</span>
        </div>
        
        {userData.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{userData.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">
            Member since {new Date(userData.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">
            Status: {userData.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Button 
          onClick={logout} 
          variant="outline" 
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </Card>
  )
}
