import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconButtonProps {
  icon: keyof typeof LucideIcons;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  tooltip?: string;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  label,
  className = '',
  tooltip,
  size = 24
}) => {
  // Dynamically get the icon component
  const IconComponent = LucideIcons[icon];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      } ${className}`}
      title={tooltip}
      aria-label={label || tooltip}
    >
      <IconComponent size={size} />
      {label && <span className="ml-2">{label}</span>}
    </button>
  );
};

export default IconButton;