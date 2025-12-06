import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <Landmark className="h-7 w-7 text-foreground group-hover:text-primary transition-colors" />
      <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }} className="text-foreground text-2xl">
        <span className="font-light">Capitol</span>
        <span className="font-black"> to Classroom</span>
      </span>
    </Link>
  );
}