import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  className?: string;
  barColor?: string;
  height?: number;
  showText?: boolean;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  className = '',
  barColor = 'bg-green-500',
  height = 6,
  showText = true,
  animate = true
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <div className="relative w-full bg-gray-200 rounded-full overflow-hidden"
           style={{ height: `${height}px` }}>
        <div
          className={`${barColor} ${animate ? 'transition-all duration-500 ease-out' : ''} rounded-full`}
          style={{ width: `${percentage}%`, height: '100%' }}
        ></div>
      </div>
      {showText && (
        <div className="text-xs mt-1 text-right">
          {current}/{max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;