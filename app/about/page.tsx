export default function About() {

  const points = [
    {
      title: "Medication Reminder",
      text: "CarePulse sends automated reminders to help elderly patients take medication on time and track adherence."
    },
    {
      title: "Daily Wellbeing Check",
      text: "Users submit a quick daily health update so carers can monitor their wellbeing remotely."
    },
    {
      title: "Green Amber Red Alerts",
      text: "The system classifies patient status into Green, Amber, and Red to identify when support is required."
    },
    {
      title: "Carer Notifications",
      text: "If medication is missed or health declines, carers receive alerts so they can respond quickly."
    },
    {
      title: "Independent Living Support",
      text: "CarePulse helps older adults maintain independence while ensuring carers stay informed."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">

      {/* TITLE */}

      <h1 className="text-4xl font-bold text-center mb-14">
        About CarePulse
      </h1>

      {/* TOP ROW */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

        {points.slice(0,3).map((item,i)=>(
          <div
            key={i}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-emerald-700 mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}

      </div>


      {/* BOTTOM ROW */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-3xl mx-auto">

        {points.slice(3).map((item,i)=>(
          <div
            key={i}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-emerald-700 mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}