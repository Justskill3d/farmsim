import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { X } from 'lucide-react';

const Notification: React.FC = () => {
  const { state, dispatch } = useGame();
  const { notification } = state;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  const bgColor = {
    success: 'bg-green-100 border-green-300',
    error: 'bg-red-100 border-red-300',
    info: 'bg-blue-100 border-blue-300'
  }[notification.type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800'
  }[notification.type];

  return (
    <div className="fixed bottom-4 right-4 max-w-sm" style={{ zIndex: 9999 }}>
      <div className={`${bgColor} border rounded-lg shadow-xl`} style={{ backgroundColor: 'white' }}>
        <div className="relative p-4">
          <button
            onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
          <h3 className={`font-medium ${textColor} mb-1`}>{notification.title}</h3>
          <p className={`text-sm ${textColor}`}>{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;