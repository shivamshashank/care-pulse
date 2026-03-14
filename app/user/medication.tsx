export default function UserMedicationReminder({ medications }: { medications: any[] }) {
  if (!medications || medications.length === 0) {
    return <div className="mt-10 mb-8 text-center text-gray-500">No medications found.</div>;
  }
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-10 mb-8">
      {medications.map((med: any, index: number) => (
        <div key={med.id || index} className="bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow flex flex-col w-[180px] min-w-0">
          <h2 className="font-bold text-emerald-700 mb-2 text-center text-lg">{med.name}</h2>
          {med.userName && (
            <p className="text-center text-emerald-600 text-xs font-semibold mb-2 bg-emerald-100 rounded-full px-2 py-0.5 w-fit mx-auto">{med.userName}</p>
          )}
          <div className="space-y-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-2 text-sm">
              <p className="text-gray-600 text-xs">Time: {med.time}</p>
              <p className={`text-xs mt-1 font-bold ${med.status === "Taken" ? "text-green-600" : "text-yellow-600"}`}>{med.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
