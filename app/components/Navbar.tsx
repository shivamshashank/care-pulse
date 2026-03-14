"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HeartIcon,
  UserIcon,
  UserGroupIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";
import users from "@/data/users.json";

export default function Navbar() {

  const [open,setOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* LOGO */}

        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <HeartIcon className="w-6 h-6 text-secondary"/>
          CarePulse
        </div>

        {/* NAV LINKS */}

        <nav className="flex items-center gap-8 text-gray-600 font-medium">

          <Link href="/" className="hover:text-primary">
            Home
          </Link>

          <Link href="/about" className="hover:text-primary">
            About
          </Link>

          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>

          {/* SIGN IN DROPDOWN */}

          <div className="relative">

            <button
              onClick={()=>setOpen(!open)}
              className="flex items-center gap-2 hover:text-primary"
            >
              Sign In
              <ChevronDownIcon className="w-4 h-4"/>
            </button>

            {open && (

              <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-md">

                <Link
                  href="/carer"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <UserGroupIcon className="w-5 text-emerald-600"/>
                  Carer
                </Link>
                {users.map(user => (
                  <Link
                    key={user.id}
                    href={`/user?id=${user.id}`}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <UserIcon className="w-5 text-emerald-600"/>
                    {user.name}
                  </Link>
                ))}

              </div>

            )}

          </div>

        </nav>

      </div>

    </header>
  );
}
