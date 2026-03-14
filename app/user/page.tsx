"use client";

import Sidebar from "@/app/components/Sidebar";
import { useState, Suspense } from "react";
import UserMedicationReminder from "./medication";
import UserCalendarPage from "./calendar";

import { useSearchParams } from "next/navigation";
import usersData from "@/data/users.json";

function UserDashboardContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  
  const [feature, setFeature] = useState("medication");
  
  // Default to user 1 if no id is provided or user not found
  const user = usersData.find(u => u.id === Number(userId)) || usersData[0];
  
  if (!user) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-500">User not found.</div>;
  }
  
  // Format user calendar data to match expected format: { day, medications: [{ name, time, status }] }
  const formattedCalendar = user.calendar?.map((cal, index) => {
    // Find the specific medication info if it matches
    const medInfo = user.medications?.find(m => m.name === cal.med);
    const statuses = ["Taken", "Pending", "Missed"];
    const status = statuses[index % 3];
    return {
      day: cal.day,
      medications: medInfo ? [{ name: medInfo.name, time: medInfo.time, status }] : []
    };
  }) || [];

  return (
    <div className="flex">
      <Sidebar
        type="user"
        onFeatureSelect={setFeature}
        selectedFeature={feature}
      />
      <div className="flex-1 h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-800 self-center text-center mt-6">Welcome, {user.name}</h1>
            {feature === "medication" && <UserMedicationReminder medications={user.medications || []} />}
            {feature === "calendar" && <UserCalendarPage calendar={formattedCalendar} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-xl text-gray-500">Loading...</div>}>
      <UserDashboardContent />
    </Suspense>
  );
}
