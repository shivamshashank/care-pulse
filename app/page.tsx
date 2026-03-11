import {
  BellAlertIcon,
  HeartIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Remote Health Monitoring for Independent Living
            </h1>

            <p className="mt-6 text-lg text-emerald-100">
              CarePulse helps older adults manage medication routines,
              track wellbeing, and keep carers informed through smart alerts.
            </p>

            <button className="mt-8 bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Explore Features
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
            <p className="text-lg">
              Supporting independence for older adults through medication
              reminders and daily wellbeing monitoring.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md text-center">
            <BellAlertIcon className="w-10 mx-auto text-emerald-600 mb-4"/>

            <h3 className="font-semibold text-lg mb-2">
              Medication Reminders
            </h3>

            <p className="text-gray-600 text-sm">
              Automated reminders help patients remember medications
              and track adherence.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md text-center">
            <HeartIcon className="w-10 mx-auto text-emerald-600 mb-4"/>

            <h3 className="font-semibold text-lg mb-2">
              Daily Wellbeing Check
            </h3>

            <p className="text-gray-600 text-sm">
              Simple daily check-ins allow carers to monitor
              patient wellbeing remotely.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md text-center">
            <ShieldCheckIcon className="w-10 mx-auto text-emerald-600 mb-4"/>

            <h3 className="font-semibold text-lg mb-2">
              Support Level Alerts
            </h3>

            <p className="text-gray-600 text-sm">
              Patient status is categorised into Green, Amber,
              or Red levels for quick intervention.
            </p>
          </div>

        </div>
      </section>

      {/* USERS */}
      <section className="bg-gray-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Who CarePulse Helps
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">Older Adults</h3>
              <p className="text-gray-600 text-sm">
                Helps elderly individuals manage medications and
                maintain independence while living at home.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">Family Carers</h3>
              <p className="text-gray-600 text-sm">
                Allows carers to monitor wellbeing and receive alerts
                without constant check-ins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">Healthcare Workers</h3>
              <p className="text-gray-600 text-sm">
                Enables nurses and support workers to identify
                patients needing attention.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}