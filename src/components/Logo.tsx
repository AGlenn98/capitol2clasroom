import { Link } from "react-router-dom";
export function Logo() {
  return <Link to="/" className="flex items-center gap-0.5 group">
      <span className="font-display text-2xl font-bold text-primary tracking-tight">
        Capitol
      </span>
      <span className="font-marker transform rotate-[-2deg] text-center font-medium mx-0 pl-0 text-3xl text-destructive">2Classroom</span>
    </Link>;
}