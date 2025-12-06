import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-0.5 group">
      <span className="logo-gradient font-mono text-2xl font-bold tracking-tight">
        Capitol2Classroom
      </span>
    </Link>
  );
}