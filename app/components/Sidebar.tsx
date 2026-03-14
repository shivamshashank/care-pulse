"use client";

import { useRouter, usePathname } from "next/navigation";
import { CalendarIcon, ClipboardDocumentListIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ type, onFeatureSelect, selectedFeature }: { type: string, onFeatureSelect?: (feature: string) => void, selectedFeature?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isUserPage = pathname === '/user';

  const logout = () => {
    router.push("/");
  };
  return (
    <aside className="w-64 h-164 bg-gradient-to-b from-emerald-600 to-emerald-400 text-white shadow-xl flex flex-col justify-between py-6 pr-6 pl-12 rounded-r-3xl">
      <div>
        <div className="flex items-center gap-3 mb-8">
          {type === "carer" ? (
            <UserGroupIcon className="w-8 h-8 text-white" />
          ) : (
            <UserIcon className="w-8 h-8 text-white" />
          )}
          <h2 className="font-extrabold text-2xl tracking-wide">
            {type === "carer" ? "Carer Panel" : "User Panel"}
          </h2>
        </div>
        <nav className="space-y-2">
          {type === "user" && (
            <>
              <button
                className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${selectedFeature === 'medication' ? 'bg-emerald-700' : 'hover:bg-emerald-700'}`}
                onClick={() => onFeatureSelect && onFeatureSelect('medication')}
              >
                <ClipboardDocumentListIcon className="w-5 h-5 text-white" />
                Medication
              </button>
              <button
                className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition ${selectedFeature === 'calendar' ? 'bg-emerald-700' : 'hover:bg-emerald-700'}`}
                onClick={() => onFeatureSelect && onFeatureSelect('calendar')}
              >
                <CalendarIcon className="w-5 h-5 text-white" />
                Calendar
              </button>
            </>
          )}
        </nav>
      </div>
      <button
        onClick={logout}
        className="mt-8 bg-white text-emerald-600 font-bold px-4 py-2 rounded-lg shadow hover:bg-emerald-100 transition"
      >
        Logout
      </button>
    </aside>
  );
}
