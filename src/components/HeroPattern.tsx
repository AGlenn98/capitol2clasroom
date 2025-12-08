export function HeroPattern() {
  return (
    <div className="hero-pattern" aria-hidden="true">
      {/* Large circle - top right */}
      <div className="hero-shape hero-shape-1" />
      {/* Medium circle - bottom left */}
      <div className="hero-shape hero-shape-2" />
      {/* Small accent circle */}
      <div className="hero-shape hero-shape-3" />
      {/* Diagonal line accent */}
      <div className="hero-shape hero-shape-4" />
      {/* Floating dots */}
      <div className="hero-shape hero-shape-5" />
      <div className="hero-shape hero-shape-6" />
    </div>
  );
}
