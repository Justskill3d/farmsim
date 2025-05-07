import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  footer?: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  title,
  footer,
  hoverable = false,
  bordered = true
}) => {
  return (
    <div
      className={`bg-amber-50 rounded-lg overflow-hidden ${
        bordered ? 'border-2 border-gray-200' : ''
      } ${
        hoverable ? 'transition-all hover:shadow-md hover:scale-[1.01]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 font-medium">
          {title}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;