"use client";

export default function SOSButton() {
    const handleEmergency = () => {
        // In a production app, this would make a POST request to your backend to trigger:
        // 1. An SMS/Email alert to the designated Carer.
        // 2. An update to the Carer Dashboard (e.g. changing wellbeing status to 'Red').
        // 3. Optional: Contacting emergency services.
        alert("EMERGENCY ALERT TRIGGERED! Notifying carers and emergency contacts immediately...");
    };

    return (
        <div className="fixed bottom-8 left-8 z-50 group flex flex-col items-start">
            {/* Popup message tooltip */}
            <div className="pointer-events-none absolute bottom-full left-0 mb-4 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-medium text-white shadow-lg">
                Emergency SOS
                <div className="absolute -bottom-1 left-6 h-3 w-3 rotate-45 bg-gray-800"></div>
            </div>

            <button
                onClick={handleEmergency}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg shadow-red-500/40 hover:from-red-600 hover:to-red-800 hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-red-300/60"
                aria-label="Emergency SOS"
            >
                <div className="flex flex-col items-center justify-center">
                    <span className="text-xl font-bold tracking-widest">SOS</span>
                </div>
            </button>
        </div>
    );
}