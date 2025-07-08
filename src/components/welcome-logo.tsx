export function WelcomeLogo() {
  return (
    <svg width="250" height="120" viewBox="0 0 250 120" className="my-8">
      <defs>
        <linearGradient id="sinaiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2A62B6" />
          <stop offset="100%" stopColor="#509BF5" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="60"
        fontFamily="Poppins, sans-serif"
        fontSize="80"
        fontWeight="bold"
        fill="url(#sinaiGradient)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Sinai
      </text>
      <circle cx="98" cy="22" r="8" fill="white" />
      <text
        x="50%"
        y="100"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#D0021B"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="0.1em"
      >
        DIGITAL WEB
      </text>
    </svg>
  );
}
