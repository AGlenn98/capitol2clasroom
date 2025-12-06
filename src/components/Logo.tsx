import { Link } from "react-router-dom";
export function Logo() {
  return <Link to="/" className="flex items-center gap-0.5 group">
      <span className="text-2xl tracking-[0.2em] text-foreground font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        Capitol to Classroom
      </span>
    </Link>;
}