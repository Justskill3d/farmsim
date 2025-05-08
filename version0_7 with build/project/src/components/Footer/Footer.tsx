import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-50 border-t border-amber-200 py-6 mt-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2024 Farming Simulator Simulator. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/roadmap"
              className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
            >
              <MapPin size={16} className="mr-1" />
              <span>Road Map</span>
            </Link>
            <a
              href="https://github.com/Justskill3d/farmsim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
            >
              <Github size={16} className="mr-1" />
              <span>GitHub</span>
            </a>
            <a
              href="https://x.com/Just_skilled"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-amber-700 hover:text-amber-800 transition-colors"
            >
              <Twitter size={16} className="mr-1" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;