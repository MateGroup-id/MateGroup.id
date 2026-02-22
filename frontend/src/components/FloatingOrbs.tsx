'use client';

// CSS-only floating animation — no JS animation loop, GPU-composited via transform only.
// Orbs are hidden on small screens to reduce GPU load on mobile.
export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — visible on all screens but smaller on mobile */}
      <div
        className="absolute w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-orange-500/15 to-orange-600/8 rounded-full blur-3xl top-20 left-10 will-change-transform animate-float-slow"
      />
      {/* Orb 2 — hidden on mobile (too GPU-heavy) */}
      <div
        className="absolute hidden md:block w-80 h-80 bg-gradient-to-br from-blue-500/8 to-cyan-500/4 rounded-full blur-3xl bottom-40 right-20 will-change-transform animate-float-medium"
      />
      {/* Orb 3 — hidden on mobile */}
      <div
        className="absolute hidden md:block w-72 h-72 bg-gradient-to-br from-purple-500/8 to-pink-500/4 rounded-full blur-3xl top-1/2 right-10 will-change-transform animate-float-fast"
      />
    </div>
  );
}

export default FloatingOrbs;
