/**
 * NetworkVisual — SVG illustration of the PSIONHQ platform architecture.
 * Shows the four products (AI, Vault, Wallet, Identity) connected to a
 * central platform hub, with encryption labels on each connection.
 * Pure SVG — no external assets, no copyright concerns.
 */

export default function NetworkVisual() {
  return (
    <svg
      viewBox="0 0 480 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nv-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nv-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </radialGradient>
        <filter id="nv-blur-lg" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="nv-blur-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Background centre glow */}
      <ellipse
        cx="240"
        cy="210"
        rx="148"
        ry="135"
        fill="url(#nv-center-glow)"
        filter="url(#nv-blur-lg)"
      />

      {/* Subtle dot grid */}
      {[60, 100, 140, 180, 220, 260, 300, 340, 380, 420].map((x) =>
        [60, 100, 140, 180, 220, 260, 300, 340, 380].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="1"
            fill="white"
            fillOpacity="0.04"
          />
        )),
      )}

      {/* Orbit rings */}
      <circle
        cx="240"
        cy="210"
        r="148"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
        fill="none"
      />
      <circle
        cx="240"
        cy="210"
        r="108"
        stroke="rgba(0,102,255,0.08)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 6"
      />

      {/* ── Connection lines ─────────────────────────── */}
      {/* Center → AI (top-left: 110, 105) */}
      <line
        x1="240" y1="210" x2="110" y2="105"
        stroke="rgba(0,102,255,0.22)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      {/* Center → Vault (top-right: 370, 105) */}
      <line
        x1="240" y1="210" x2="370" y2="105"
        stroke="rgba(0,102,255,0.22)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      {/* Center → Wallet (bottom-right: 370, 315) */}
      <line
        x1="240" y1="210" x2="370" y2="315"
        stroke="rgba(0,102,255,0.22)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      {/* Center → Identity (bottom-left: 110, 315) */}
      <line
        x1="240" y1="210" x2="110" y2="315"
        stroke="rgba(0,102,255,0.22)"
        strokeWidth="1"
        strokeDasharray="5 4"
      />

      {/* Midpoint marker dots */}
      <circle cx="175" cy="157" r="3" fill="#0066FF" fillOpacity="0.55" />
      <circle cx="305" cy="157" r="3" fill="#0066FF" fillOpacity="0.55" />
      <circle cx="305" cy="262" r="3" fill="#0066FF" fillOpacity="0.55" />
      <circle cx="175" cy="262" r="3" fill="#0066FF" fillOpacity="0.55" />

      {/* ── Tech labels on lines ─────────────────────── */}
      <g>
        <rect x="142" y="142" width="48" height="16" rx="8" fill="#080808" stroke="rgba(0,102,255,0.3)" strokeWidth="0.5" />
        <text x="166" y="151" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="rgba(0,102,255,0.8)">AES-256</text>
      </g>
      <g>
        <rect x="290" y="142" width="48" height="16" rx="8" fill="#080808" stroke="rgba(0,102,255,0.3)" strokeWidth="0.5" />
        <text x="314" y="151" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="rgba(0,102,255,0.8)">Ed25519</text>
      </g>
      <g>
        <rect x="290" y="260" width="48" height="16" rx="8" fill="#080808" stroke="rgba(0,102,255,0.3)" strokeWidth="0.5" />
        <text x="314" y="269" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="rgba(0,102,255,0.8)">TEE/TDX</text>
      </g>
      <g>
        <rect x="142" y="260" width="48" height="16" rx="8" fill="#080808" stroke="rgba(0,102,255,0.3)" strokeWidth="0.5" />
        <text x="166" y="269" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="rgba(0,102,255,0.8)">DID / VC</text>
      </g>

      {/* ── Centre hub ───────────────────────────────── */}
      <circle cx="240" cy="210" r="54" fill="url(#nv-node-glow)" filter="url(#nv-blur-sm)" />
      <circle cx="240" cy="210" r="43" fill="#050505" stroke="rgba(0,102,255,0.5)" strokeWidth="1.5" />
      <circle cx="240" cy="210" r="36" fill="rgba(0,102,255,0.06)" stroke="rgba(0,102,255,0.18)" strokeWidth="1" />
      <text x="240" y="207" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#3388FF" letterSpacing="2">PSIONHQ</text>
      <text x="240" y="222" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.28)" letterSpacing="1.5">PLATFORM</text>

      {/* ── AI Node — top-left (110, 105) ────────────── */}
      <circle cx="110" cy="105" r="44" fill="url(#nv-node-glow)" filter="url(#nv-blur-sm)" />
      <circle cx="110" cy="105" r="33" fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Layers icon */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="98,98 110,93 122,98 110,103" />
        <polyline points="98,107 110,112 122,107" />
        <polyline points="98,116 110,121 122,116" />
      </g>
      <text x="110" y="150" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">PSIONHQ AI</text>

      {/* ── Vault Node — top-right (370, 105) ────────── */}
      <circle cx="370" cy="105" r="44" fill="url(#nv-node-glow)" filter="url(#nv-blur-sm)" />
      <circle cx="370" cy="105" r="33" fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Lock icon */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="358" y="100" width="24" height="16" rx="2" />
        <path d="M362 100 V96 a8 8 0 0 1 16 0 v4" />
        <circle cx="370" cy="109" r="2.5" fill="rgba(255,255,255,0.55)" />
      </g>
      <text x="370" y="150" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">PSIONHQ VAULT</text>

      {/* ── Wallet Node — bottom-right (370, 315) ─────── */}
      <circle cx="370" cy="315" r="44" fill="url(#nv-node-glow)" filter="url(#nv-blur-sm)" />
      <circle cx="370" cy="315" r="33" fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Card icon */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="356" y="305" width="28" height="20" rx="3" />
        <line x1="356" y1="313" x2="384" y2="313" />
        <rect x="360" y="317" width="8" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      </g>
      <text x="370" y="360" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">PSIONHQ WALLET</text>

      {/* ── Identity Node — bottom-left (110, 315) ────── */}
      <circle cx="110" cy="315" r="44" fill="url(#nv-node-glow)" filter="url(#nv-blur-sm)" />
      <circle cx="110" cy="315" r="33" fill="#050505" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* User icon */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="110" cy="306" r="7" />
        <path d="M92 327 a18 10 0 0 1 36 0" />
      </g>
      <text x="110" y="360" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">PSIONHQ ID</text>
    </svg>
  );
}
