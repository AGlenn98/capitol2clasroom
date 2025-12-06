import { Link } from "react-router-dom";
export function Logo() {
  return <Link to="/" className="flex items-center gap-0.5 group">
      <span className="logo-title font-mono text-2xl tracking-tight mx-0 px-0 text-center font-extrabold">
        Capitol2Classroom
      </span>
    </Link>;
}