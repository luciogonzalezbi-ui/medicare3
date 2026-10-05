import React from 'react';
import { PillIconType } from '../types';

interface PillIconProps {
  type: PillIconType;
  color?: string;
  size?: number;
  className?: string;
}

export const PillIcon: React.FC<PillIconProps> = ({
  type,
  color = '#0284c7',
  size = 28,
  className = '',
}) => {
  if (type === 'capsule') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g transform="rotate(-35 16 16)">
          {/* Top half - colored */}
          <path
            d="M11 16C11 11.0294 13.2386 7 16 7C18.7614 7 21 11.0294 21 16L11 16Z"
            fill={color}
          />
          {/* Bottom half - white/mint */}
          <path
            d="M11 16L21 16C21 20.9706 18.7614 25 16 25C13.2386 25 11 20.9706 11 16Z"
            fill="#F0FDF4"
            stroke="#86EFAC"
            strokeWidth="0.8"
          />
          {/* Capsule outline & shine */}
          <rect
            x="11"
            y="7"
            width="10"
            height="18"
            rx="5"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M13.5 10C13.5 8.8 14.5 8 16 8"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      </svg>
    );
  }

  if (type === 'tablet') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="16" cy="16" r="10" fill="#F8FAFC" stroke={color} strokeWidth="1.8" />
        <line x1="16" y1="8" x2="16" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 11C13.2 9.8 15 9.5 16.5 9.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  // Default round pill
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="10.5" fill="#FFFFFF" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="16" r="7.5" fill={color} fillOpacity="0.15" />
      <line
        x1="10"
        y1="16"
        x2="22"
        y2="16"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <circle cx="13" cy="12" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  );
};
