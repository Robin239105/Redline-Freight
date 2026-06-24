/** Side-profile semi-truck — black/red on light. Crisp at any size. */
export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Redline freight truck"
    >
      {/* Trailer */}
      <rect x="2" y="9" width="74" height="33" rx="1" fill="#FFFFFF" stroke="#0B0B0A" strokeWidth="2.5" />
      <rect x="9" y="15" width="60" height="5" fill="#E4002B" />
      {/* Cab */}
      <path
        d="M78 19 H96 L112 30 V42 H78 Z"
        fill="#E4002B"
        stroke="#0B0B0A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Window */}
      <path d="M97 23 H104 L110 30 H97 Z" fill="#0B0B0A" />
      {/* Wheels */}
      <circle cx="24" cy="46" r="7" fill="#0B0B0A" />
      <circle cx="24" cy="46" r="2.5" fill="#FFFFFF" />
      <circle cx="60" cy="46" r="7" fill="#0B0B0A" />
      <circle cx="60" cy="46" r="2.5" fill="#FFFFFF" />
      <circle cx="100" cy="46" r="7" fill="#0B0B0A" />
      <circle cx="100" cy="46" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}
