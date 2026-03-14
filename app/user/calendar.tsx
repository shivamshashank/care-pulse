export default function UserCalendarPage({ calendar }: { calendar: any[] }) {
  if (!calendar || calendar.length === 0) {
    return <div className="mt-10 mb-8 text-center text-gray-500">No calendar data found.</div>;
  }
  // Split days for 4 above, 3 below
  const firstRow = calendar.slice(0, 4);
  const secondRow = calendar.slice(4);
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 h-full flex flex-col justify-center">
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {firstRow.map((day, index) => (
          <div key={index} className="bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow flex flex-col w-[180px] min-w-0">
            <h2 className="font-bold text-emerald-700 mb-3 text-center text-lg">{day.day}</h2>
            <div className="space-y-2">
              {day.medications.map((med: any, i: number) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-md p-2 text-sm">
                  <p className="font-medium text-emerald-900">{med.name}</p>
                  <p className="text-gray-600 text-xs">{med.time}</p>
                  {med.status && (
                    <p className={`text-xs mt-1 font-bold ${med.status === "Taken" ? "text-green-600" : med.status === "Missed" ? "text-red-600" : "text-yellow-600"}`}>{med.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {secondRow.map((day, index) => (
          <div key={index} className="bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow flex flex-col w-[180px] min-w-0">
            <h2 className="font-bold text-emerald-700 mb-3 text-center text-lg">{day.day}</h2>
            <div className="space-y-2">
              {day.medications.map((med: any, i: number) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-md p-2 text-sm">
                  <p className="font-medium text-emerald-900">{med.name}</p>
                  <p className="text-gray-600 text-xs">{med.time}</p>
                  {med.status && (
                    <p className={`text-xs mt-1 font-bold ${med.status === "Taken" ? "text-green-600" : med.status === "Missed" ? "text-red-600" : "text-yellow-600"}`}>{med.status}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
