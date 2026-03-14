"use client";

import Sidebar from "@/app/components/Sidebar";
import { useState } from "react";
import UserMedicationReminder from "../user/medication";
import UserCalendarPage from "../user/calendar";
import usersData from "@/data/users.json";

export default function CarerDashboard() {

  const [feature, setFeature] = useState("medication");
  const [selectedUserId, setSelectedUserId] = useState<number | "all">("all");

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedUserId(value === "all" ? "all" : Number(value));
  };
  
  // Compute passed data
  let displayMedications: any[] = [];
  let displayCalendar: any[] = [];
  
  if (selectedUserId === "all") {
    // Combine all users' data
    usersData.forEach(u => {
      displayMedications = [...displayMedications, ...(u.medications?.map(m => ({...m, userName: u.name})) || [])];
      
      const formattedCal = u.calendar?.map((cal, i) => {
        const medInfo = u.medications?.find(m => m.name === cal.med);
        const statuses = ["Taken", "Pending", "Missed"];
        const status = statuses[(u.id + i) % 3];
        return {
          day: cal.day,
          medications: medInfo ? [{ name: medInfo.name + ` (${u.name})`, time: medInfo.time, status }] : []
        };
      }) || [];
      
      // Merge calendar by day
      formattedCal.forEach(calDay => {
        const existingDay = displayCalendar.find(d => d.day === calDay.day);
        if (existingDay) {
          existingDay.medications = [...existingDay.medications, ...calDay.medications];
        } else {
          displayCalendar.push(calDay);
        }
      });
    });
    
    // Sort calendar by standard days
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    displayCalendar.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
  } else {
    // Single user data
    const user = usersData.find(u => u.id === selectedUserId);
    if (user) {
      displayMedications = user.medications || [];
      displayCalendar = user.calendar?.map((cal, i) => {
        const medInfo = user.medications?.find(m => m.name === cal.med);
        const statuses = ["Taken", "Pending", "Missed"];
        const status = statuses[i % 3];
        return {
          day: cal.day,
          medications: medInfo ? [{ name: medInfo.name, time: medInfo.time, status }] : []
        };
      }) || [];
    }
  }

  return (
    <div className="flex">
      <Sidebar
        type="carer"
        onFeatureSelect={setFeature}
        selectedFeature={feature}
      />
      <div className="flex-1 h-full flex flex-col">
        <div className="px-8 mt-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-emerald-800">Carer Dashboard</h1>
            <div className="flex items-center gap-3">
                <label className="text-gray-600 font-medium">Select User:</label>
                <select 
                    value={selectedUserId}
                    onChange={handleUserChange}
                    className="border border-emerald-300 rounded-md p-2 bg-white text-emerald-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <option value="all">All Users</option>
                    {usersData.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </select>
            </div>
        </div>
        
        <div className="flex-1 flex justify-center items-start mt-4 overflow-y-auto">
          <div className="w-full">
            {feature === "medication" && <UserMedicationReminder medications={displayMedications} />}
            {feature === "calendar" && <UserCalendarPage calendar={displayCalendar} />}
          </div>
        </div>
      </div>
    </div>
  );
}
