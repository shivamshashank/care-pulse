import calendar from "@/data/calendar.json"

export default function Calendar(){
  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Medication Calendar</h1>

      <div className="grid grid-cols-7 gap-4">
        {calendar.map((day:any)=> (
          <div key={day.date} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{day.date}</h3>
            <ul className="text-sm mt-2">
              {day.meds.map((m:any,i:number)=> (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}