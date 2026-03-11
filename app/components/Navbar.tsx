import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <HeartIcon className="w-6 h-6 text-secondary"/>
          CarePulse
        </div>

        <nav className="flex gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/features/medication-reminder" className="hover:text-primary">Medication</Link>
          <Link href="/features/calendar" className="hover:text-primary">Calendar</Link>
        </nav>

      </div>
    </header>
  );
}