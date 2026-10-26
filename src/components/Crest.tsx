import React from 'react';

interface CrestProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export const Crest: React.FC<CrestProps> = ({ className = "w-10 h-10", size = 40, showWordmark = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_0_12px_rgba(198,255,0,0.35)]"
      >
        <defs>
          <linearGradient id="crestShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#111722" />
            <stop offset="100%" stopColor="#080B12" />
          </linearGradient>
          <linearGradient id="crestLimeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6FF00" />
            <stop offset="100%" stopColor="#A3E635" />
          </linearGradient>
          <radialGradient id="crestGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Shield Border */}
        <path
          d="M50 4 L92 20 C92 70 50 112 50 116 C50 112 8 70 8 20 L50 4 Z"
          fill="url(#crestShieldGrad)"
          stroke="#C6FF00"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Radial Glow */}
        <path
          d="M50 8 L87 23 C87 67 50 106 50 106 C50 106 13 67 13 23 L50 8 Z"
          fill="url(#crestGlow)"
        />

        {/* Inner Shield Contour */}
        <path
          d="M50 12 L84 25 C84 65 50 102 50 102 C50 102 16 65 16 25 L50 12 Z"
          stroke="#283141"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Athletic Chevrons (Intensity & Forward Motion) */}
        <path
          d="M26 44 L50 62 L74 44"
          stroke="url(#crestLimeGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 58 L50 72 L68 58"
          stroke="#F5F7FA"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Star of Excellence */}
        <path
          d="M50 18 L53 26 L61 27 L55 33 L57 41 L50 37 L43 41 L45 33 L39 27 L47 26 Z"
          fill="#C6FF00"
        />

        {/* FC Monogram Base Text */}
        <text
          x="50"
          y="93"
          textAnchor="middle"
          fill="#F5F7FA"
          fontSize="14"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="system-ui, sans-serif"
        >
          COACH
        </text>
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-widest text-[#F5F7FA] uppercase font-sans">
              COACH
            </span>
            <span className="text-xl font-black tracking-wider text-[#C6FF00] uppercase font-sans">
              FC
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.25em] text-[#929BA9] uppercase mt-0.5">
            BUILT FOR THE GAME
          </span>
        </div>
      )}
    </div>
  );
};
