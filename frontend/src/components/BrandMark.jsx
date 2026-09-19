import React from "react";

/**
 * AgriShield X — Official Brand Mark & Wordmark System
 * 
 * Direction: Hybrid of Option 2 (Precision Radar + Crop) & Option 3 (Abstract Protective Emblem)
 * Communicates:
 *   - Prediction (concentric forward-looking radar sweeps)
 *   - Precision Sensing (calibrated telemetry arc waves)
 *   - Agriculture (central resilient leaf / seed germination node)
 *   - Crop Protection (protective enclosing contour cradling the sensing field)
 *   - Resilience (grounded stem anchor and balanced geometry)
 * 
 * Design Standards:
 *   - NO literal shield
 *   - NO glow filters
 *   - NO heavy gradients
 *   - NO detached pill around "X"
 *   - Pure modern sans-serif typography with calibrated kerning
 */

/**
 * Pure SVG Icon Mark
 * Scales seamlessly from 16px to 64px+
 */
export function AgriShieldMark({ size = 32, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="AgriShield X Logo"
      {...props}
    >
      {/* Outer Protective Enclosing Contour (Option 3 DNA): subtle protective perimeter */}
      <path
        d="M 6 26 A 14 14 0 0 1 26 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.34"
      />
      {/* Middle Precision Sensing Arc (Option 2 DNA): radar sweep telemetry */}
      <path
        d="M 10 24 A 9.5 9.5 0 0 1 24 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.68"
      />
      {/* Inner Precision Radar Pulse: core sensor scan */}
      <path
        d="M 14 22 A 5.5 5.5 0 0 1 22 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Central Agricultural Leaf / Seed Node: crop health, vitality, resilience */}
      <path
        d="M 16 20 C 13.5 18 12.8 14.5 16 11 C 19.2 14.5 18.5 18 16 20 Z"
        fill="currentColor"
      />
      {/* Grounding stem */}
      <line
        x1="16"
        y1="20"
        x2="16"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

/**
 * Micro / Favicon-optimized SVG Mark (16px - 24px)
 */
export function AgriShieldFaviconMark({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="AgriShield X Favicon"
    >
      <path
        d="M 6 26 A 14 14 0 0 1 26 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 10 24 A 9.5 9.5 0 0 1 24 10"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 14 22 A 5.5 5.5 0 0 1 22 14"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 16 20 C 13.5 18 12.8 14.5 16 11 C 19.2 14.5 18.5 18 16 20 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Standard Navbar Logo
 * Displays Icon + "AgriShield" + emerald "X" (no pill) + subtitle
 */
export function AgriShieldLogo({
  iconSize = 32,
  showSubtitle = true,
  className = "",
  variant = "default"
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Clean minimal mark container */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 group-hover:border-emerald-500/35 transition-all duration-200">
        <AgriShieldMark size={iconSize === 32 ? 24 : iconSize} />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline font-outfit select-none leading-none">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white transition-colors">
            AgriShield
          </span>
          <span className="font-extrabold text-lg sm:text-xl tracking-wide text-emerald-600 dark:text-emerald-400 ml-1.5 transition-colors">
            X
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:block mt-0.5 tracking-normal">
            Predictive AI Crop Protection
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Mobile Header Logo
 * Space-efficient for narrow mobile viewports
 */
export function AgriShieldMobileLogo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        <AgriShieldMark size={20} />
      </div>
      <div className="flex items-baseline font-outfit select-none leading-none">
        <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
          AgriShield
        </span>
        <span className="font-extrabold text-base tracking-wide text-emerald-600 dark:text-emerald-400 ml-1">
          X
        </span>
      </div>
    </div>
  );
}

/**
 * Large Hero Brand Mark (Landing Page / Auth Card)
 */
export function AgriShieldHeroBrand({ className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-3.5 select-none ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
        <AgriShieldMark size={36} />
      </div>
      <div className="text-center">
        <div className="flex items-baseline justify-center font-outfit">
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white">
            AgriShield
          </span>
          <span className="font-extrabold text-2xl sm:text-3xl tracking-wide text-emerald-600 dark:text-emerald-400 ml-2">
            X
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Predictive AI for Smarter Crop Protection
        </p>
      </div>
    </div>
  );
}

export default AgriShieldLogo;
