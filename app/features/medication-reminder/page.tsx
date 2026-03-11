import meds from "@/data/medications.json"

export default function MedicationReminder(){
  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Medication Reminder</h1>

      <div className="grid grid-cols-3 gap-6">
        {meds.map((med:any)=> (
          <div key={med.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{med.name}</h2>
            <p className="text-gray-500">Time: {med.time}</p>
            <span className="text-sm mt-2 inline-block bg-blue-100 px-2 py-1 rounded">
              {med.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
