export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400">

      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-white text-xl font-semibold mb-2">CarePulse</h2>
          <p className="text-sm">
            Remote health monitoring and medication support
            for elderly patients.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Product</h3>
          <ul className="space-y-1 text-sm">
            <li>Medication Reminder</li>
            <li>Health Dashboard</li>
            <li>Calendar</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-sm">support@carepulse.com</p>
          <p className="text-sm">United Kingdom</p>
        </div>

      </div>

      <div className="text-center border-t border-gray-700 py-4 text-sm">
        © 2026 CarePulse
      </div>

    </footer>
  );
}