import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Search, ShoppingCart, Settings, DollarSign, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PrimeArbitrage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPremium, setIsPremium] = useState(false);

  // Sample data - In production, this would come from your APIs
  const trendingItems = [
    { id: 1, name: "GPU RTX 4090", currentPrice: 1599, lowestPrice: 1399, profit: 200, risk: "low" },
    { id: 2, name: "PS5 Console", currentPrice: 499, lowestPrice: 449, profit: 50, risk: "medium" },
    { id: 3, name: "Nike Air Max", currentPrice: 189, lowestPrice: 129, profit: 60, risk: "low" },
  ];

  const priceHistory = [
    { date: '2024-01', price: 1599 },
    { date: '2024-02', price: 1550 },
    { date: '2024-03', price: 1499 },
    { date: '2024-04', price: 1399 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Navigation */}
      <nav className="bg-gray-900 p-4 border-b border-blue-500">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            PRIME ARBITRAGE
          </h1>
          <div className="flex items-center space-x-6">
            <button className="text-blue-400 hover:text-blue-300">
              <Bell size={24} />
            </button>
            <button className="text-blue-400 hover:text-blue-300">
              <Search size={24} />
            </button>
            <button className="text-blue-400 hover:text-blue-300">
              <Settings size={24} />
            </button>
            {!isPremium && (
              <button 
                onClick={() => setIsPremium(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trending Opportunities */}
          <Card className="col-span-2 bg-gray-800 border-blue-500">
            <CardHeader>
              <CardTitle className="text-xl text-blue-400 flex items-center">
                <TrendingUp className="mr-2" /> High Value, Fast Moving
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingItems.map(item => (
                  <div key={item.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span className="text-green-400">${item.profit} potential profit</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-300">
                      <span>Current: ${item.currentPrice}</span>
                      <span>Lowest: ${item.lowestPrice}</span>
                      <span className={`${
                        item.risk === 'low' ? 'text-green-400' : 
                        item.risk === 'medium' ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>
                        Risk: {item.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price History Chart */}
          <Card className="bg-gray-800 border-blue-500">
            <CardHeader>
              <CardTitle className="text-xl text-blue-400">Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #3B82F6'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Alert */}
          <Alert className="bg-yellow-900 border-yellow-600">
            <AlertTriangle className="text-yellow-400" />
            <AlertDescription className="text-yellow-100">
              Unusual price movement detected in Electronics category. 15% drop in last 24h.
            </AlertDescription>
          </Alert>

          {/* Premium Features (only shown to premium users) */}
          {isPremium && (
            <Card className="col-span-3 bg-gray-800 border-blue-500">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">AI Listing Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    <Package className="mx-auto mb-2 text-blue-400" />
                    <span className="text-gray-200">Auto-List to Amazon</span>
                  </button>
                  <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    <ShoppingCart className="mx-auto mb-2 text-blue-400" />
                    <span className="text-gray-200">eBay Optimization</span>
                  </button>
                  <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    <DollarSign className="mx-auto mb-2 text-blue-400" />
                    <span className="text-gray-200">Profit Calculator</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimeArbitrage;