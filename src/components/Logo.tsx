import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-0.5 group">
      <span className="font-display text-2xl font-bold text-primary tracking-tight">
        Capitol
      </span>
      <span className="font-marker text-2xl text-primary transform rotate-[-2deg]">
        2 Classroom
      </span>
    </Link>
  );
}
