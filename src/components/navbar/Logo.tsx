import Link from "next/link";

/** PSIONHQ logomark — Ψ (Psi) icon on brand-blue square + wordmark */
function PsiMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="#0066FF" />
      {/* Ψ stem */}
      <line
        x1="16" y1="9" x2="16" y2="23"
        stroke="white" strokeWidth="2.25" strokeLinecap="round"
      />
      {/* Ψ arch */}
      <path
        d="M10 12 C10 17.5 13 19.5 16 19.5 C19 19.5 22 17.5 22 12"
        stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"
        fill="none"
      />
      {/* Ψ base serif */}
      <line
        x1="13" y1="23" x2="19" y2="23"
        stroke="white" strokeWidth="2.25" strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="PSIONHQ home">
      <PsiMark />
      <span className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
        PSIONHQ
      </span>
    </Link>
  );
}
