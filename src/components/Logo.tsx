import { Link } from "react-router-dom";
export function Logo() {
  return <Link to="/" className="flex items-center gap-0.5 group">
      <span style={{
      fontFamily: 'Helvetica, Arial, sans-serif'
    }} className="text-foreground font-bold text-3xl px-0 mx-0 text-center">
        Capitol to Classroom
      </span>
    </Link>;
}