import calendar from "@/data/calendar.json";

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold text-center mb-12">
        Medication Calendar
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">

        {calendar.map((day, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow-sm flex flex-col"
          >

            <h2 className="font-semibold text-emerald-700 mb-3 text-center">
              {day.day}
            </h2>

            <div className="space-y-2">

              {day.medications.map((med, i) => (
                <div
                  key={i}
                  className="bg-emerald-50 border border-emerald-200 rounded-md p-2 text-sm"
                >

                  <p className="font-medium">{med.name}</p>

                  <p className="text-gray-600 text-xs">
                    {med.time}
                  </p>

                  {med.status && (
                    <p
                      className={`text-xs mt-1 font-medium ${
                        med.status === "Taken"
                          ? "text-green-600"
                          : med.status === "Missed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {med.status}
                    </p>
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