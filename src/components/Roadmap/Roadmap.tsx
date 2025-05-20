import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, Star, Clock, Zap } from 'lucide-react';

const Roadmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Game
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-8">
            <MapPin size={24} className="text-amber-600 mr-3" />
            <h1 className="text-3xl font-bold">Road Map</h1>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="text-amber-500 mr-2" />
                Coming Soon
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-medium mb-2">Equipment</h3>
                  <p className="text-sm text-gray-600">
                    Get powerful and new items to show off and pump up your stats.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-medium mb-2">Crafting</h3>
                  <p className="text-sm text-gray-600">
                   Combine all the things. Try and get all the items you would ever dream off. Or maybe just some new items. Like a chest. 
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-medium mb-2">Weather impacts and events</h3>
                  <p className="text-sm text-gray-600">
                   Some Weather is in here. But the impact is very little. Same goes for seasons. 
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="text-amber-500 mr-2" />
                In Development
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium mb-2">Collection and Progress</h3>
                  <p className="text-sm text-gray-600">
                    Complete your Collection and get every item. Because, well, why not. There will be the opportunity to save your progress
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium mb-2">Balancing between Professions</h3>
                  <p className="text-sm text-gray-600">
                    Testing is an ongoing process. This takes time. And i am open for feedback. You can text at X @Just_skilled. Thank you. 
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-medium mb-2">Music and Sounds, pictures</h3>
                  <p className="text-sm text-gray-600">
                    It is to quiet out here. I am working on color, some nice sounds. This will take a while. 
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Zap className="text-amber-500 mr-2" />
                Future Ideas
              </h2>
              <div className="space-y-2">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Advanced farming mechanics with crop rotation</li>
                    <li>Pet companions with unique abilities</li>
                    <li>Village reputation system</li>
                   
                    <li>Mobile version</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;